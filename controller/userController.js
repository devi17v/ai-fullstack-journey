//controller layer - This is where request handling + validation happens before calling service.

const userService = require('../services/userServices');
const ApiError = require('../utils/ApiError');

exports.getUsers = (req, res, next) => {
  try {
    const users = userService.getAllUsers(req.query.limit);
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

exports.getUserById = (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id) || id <= 0) {
      throw new ApiError("Invalid ID format", 400);
    }

    const user = userService.getUserById(id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

exports.createUser = (req, res, next) => {
  try {
    const newUser = userService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
};

exports.updateUser = (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id) || id <= 0) {
      throw new ApiError("Invalid ID format", 400);
    }

    const updatedUser = userService.updateUser(id, req.body);
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id) || id <= 0) {
      throw new ApiError("Invalid ID format", 400);
    }

    userService.deleteUser(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
};