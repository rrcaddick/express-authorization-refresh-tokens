const { RequestHandler } = require("express");

/** @type RequestHandler  */
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode || 500;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
    errors: err.errors || {},
  });
};

module.exports = {
  errorHandler,
};
