const userService = require('../services/userServices');
const asyncHandler = require('../utils/asyncHandler');

exports.getUsers = asyncHandler(async (req, res) => {
  const users = await userService.getAllUsers(req.query.limit);
  res.status(200).json({
    status: "success",
    results: users.length,
    data: users
  });
});

exports.getUserById = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.userId);
  res.status(200).json({
    status: "success",
    data: user
  });
});

exports.createUser = asyncHandler(async (req, res) => {
  const newUser = await userService.createUser(req.body);

  res.status(201).json({
    status: "success",
    data: newUser
  });
});

exports.updateUser = asyncHandler(async (req, res) => {
  const updatedUser = await userService.updateUser(req.userId, req.body);
  res.status(200).json({
    status: "success",
    data: updatedUser
  });
});

exports.deleteUser = asyncHandler(async (req, res) => {
  await userService.deleteUser(req.userId);
  res.status(204).json({
    status: "success",
    data: null
  });
});