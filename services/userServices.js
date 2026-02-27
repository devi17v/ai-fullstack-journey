const ApiError = require('../utils/ApiError');

let users = [
  { id: 1, name: "John", createdAt: new Date() },
  { id: 2, name: "Kenady", createdAt: new Date() },
  { id: 3, name: "Thomas", createdAt: new Date() }
];

exports.getAllUsers = (limit) => {
  const parsedLimit = Number(limit);

  if (!Number.isNaN(parsedLimit) && parsedLimit > 0) {
    return users.slice(0, parsedLimit);
  }

  return users;
};

exports.getUserById = (id) => {
  const user = users.find(u => u.id === id);

  if (!user) {
    throw new ApiError("User not found", 404);
  }

  return user;
};

exports.createUser = (data) => {
  const { name } = data;

  if (!name || name.length < 3) {
    throw new ApiError("Name must be at least 3 characters", 400);
  }

  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    name,
    createdAt: new Date()
  };

  users.push(newUser);
  return newUser;
};

exports.updateUser = (id, data) => {
  const user = users.find(u => u.id === id);

  if (!user) {
    throw new ApiError("User not found", 404);
  }

  const { name } = data;

  if (!name || name.length < 3) {
    throw new ApiError("Name must be at least 3 characters", 400);
  }

  user.name = name;
  return user;
};

exports.deleteUser = (id) => {
  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    throw new ApiError("User not found", 404);
  }

  users.splice(index, 1);
};