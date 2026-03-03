// middleware/validateId.js

const mongoose = require('mongoose');
const ApiError = require('../utils/ApiError');

const validateId = (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ApiError("Invalid ID format", 400));
  }

  req.userId = id;
  next();
};

module.exports = validateId;