const rateLimit = require("express-rate-limit");

// Global API limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later"
});

// Login limiter 
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    status: "fail",
    message: "Too many login attempts. Please try again after 15 minutes."
  },
  standardHeaders: true,
  legacyHeaders: false
});

module.exports = {
  apiLimiter,
  loginLimiter
};