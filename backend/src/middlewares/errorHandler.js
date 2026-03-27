const logger = require("../config/logger");
const ApiError = require("../utils/apiError");

const notFoundHandler = (req, res, next) => {
  next(new ApiError(404, `Route not found: ${req.originalUrl}`));
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  logger.error("Request failed", {
    path: req.originalUrl,
    method: req.method,
    statusCode,
    message,
    stack: err.stack
  });

  res.status(statusCode).json({
    success: false,
    message,
    details: err.details || null
  });
};

module.exports = {
  notFoundHandler,
  errorHandler
};
