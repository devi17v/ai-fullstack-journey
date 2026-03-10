//Load environment variables
require("dotenv").config();

// Import dependencies
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const connectDB = require("./config/db");
const { apiLimiter } = require("./middleware/rateLimiter");
const logger = require("./utils/logger");

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorHandler");

// Create express app
const app = express();

// Security Middleware
app.use(helmet());

// Rate Limiting 
app.use(apiLimiter);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

// Logger
logger.info("Server middleware initialized");

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: "fail",
    message: "Route not found"
  });
});

// Global Error Handler
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    logger.error("Failed to start server: " + error.message);
    process.exit(1);
  }
};

startServer();