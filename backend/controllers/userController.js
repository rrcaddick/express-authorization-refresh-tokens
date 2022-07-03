const asyncHandler = require("express-async-handler");
const { RequestHandler } = require("express");
const { validationResult } = require("express-validator");
const createValidationError = require("../utils/createValidationError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

/** @desc Register a new user */
/** @route POST /api/users */
/** @access Public */
/** @type RequestHandler */
const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400);
    const error = new Error("Validation failed");
    error.errors = createValidationError(errors.array(), "name", "email", "password", "confirmPassword");
    throw error;
  }

  res.json({ message: "Register user" });
});

/** @desc Authenticate a user */
/** @route POST /api/users/login */
/** @access Public */
/** @type RequestHandler */
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  res.json({ message: "Login user" });
});

/** @desc Get user data */
/** @route GET /api/users/me */
/** @access Private */
/** @type RequestHandler */
const getMe = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  res.json({ message: "User data" });
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
