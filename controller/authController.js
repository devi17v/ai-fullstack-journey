const User = require("../models/User");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const logger = require("../utils/logger");

//Generate Token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

//Register
exports.register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError("Email already exists", 400);
  }

  const user = await User.create({ name, email, password });

  const token = generateToken(user);

  res.status(201).json({
    status: "success",
    token
  });
});

//Login
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    logger.info("User login attempt");
    logger.error("Invalid credentials");
    throw new ApiError("Invalid credentials", 401); 
  }

  const token = generateToken(user);
    res.status(200).json({
    status: "success",
    token
  });
});

