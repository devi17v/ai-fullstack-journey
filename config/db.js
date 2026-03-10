const mongoose = require('mongoose');
const logger = require("../utils/logger");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
    logger.info("MongoDB Connected");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    logger.error("Database connection failed: " + error.message);
    process.exit(1);
  }
};

module.exports = connectDB;