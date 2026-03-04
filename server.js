// Load environment variables FIRST
require("dotenv").config();

// Import dependencies
const express = require("express");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

const errorHandler = require("./middleware/errorHandler");

// Create express app
const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Register routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// 404 Middleware (must come after routes)
app.use((req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: "Route not found"
  });
});

// Global error middleware (must be last)
app.use(errorHandler);

// Start server AFTER DB connection
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();