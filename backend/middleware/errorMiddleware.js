const { RequestHandler } = require("express");

/** @type RequestHandler  */
const errorHandler = (err, req, res, next) => {
  const developement = process.env.NODE_ENV === "development";
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  const errorMessage = res.statusCode === 200 ? "Something went wrong. Please contact administrator" : err.message;

  res.status(statusCode).json({
    message: developement ? err.message : errorMessage,
    stack: developement ? err.stack : undefined,
    errors: err.errors || {},
  });
};

module.exports = {
  errorHandler,
};
