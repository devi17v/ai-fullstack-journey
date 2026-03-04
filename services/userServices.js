const User = require('../models/User');
const ApiError = require('../utils/ApiError');

exports.getAllUsers = async (limit) => {
  const parsedLimit = Number(limit);
  if (!Number.isNaN(parsedLimit) && parsedLimit > 0) {
    return await User.find().limit(parsedLimit);
  }
  return await User.find();
};

exports.getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new ApiError("User not found", 404);
  }
  return user;
};

exports.createUser = async (data) => {
  const { name, email } = data;
  if (!name || name.length < 3) {
    throw new ApiError("Name must be at least 3 characters", 400);
  }

const newUser = await User.create({
    name,
    email
  });
  return newUser;
};

exports.updateUser = async (id, data) => {
  const { name } = data;
  if (name && name.length < 3) {
    throw new ApiError("Name must be at least 3 characters", 400);
  }
  const updatedUser = await User.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true
    }
  );
  if (!updatedUser) {
    throw new ApiError("User not found", 404);
  }
  return updatedUser;
};

exports.deleteUser = async (id) => {
  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) {
    throw new ApiError("User not found", 404);
  }
  return deletedUser;
};