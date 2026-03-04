const ApiError = require("../utils/ApiError");

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ApiError("Access denied", 403);
    }
    next();
  };
};