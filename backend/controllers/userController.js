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
  const { name, email, password } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400);
    const error = new Error("Validation failed");
    error.errors = createValidationError(errors.array(), "name", "email", "password", "confirmPassword");
    throw error;
  }

  const salt = await bcrypt.genSalt(12);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = await User.create({ name, email, password: hashPassword });

  if (!user) {
    res.status(400);
    throw new Error("Invalid user data");
  }

  res.status(201).json({
    _id: user.id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
});

/** @desc Authenticate a user */
/** @route POST /api/users/login */
/** @access Public */
/** @type RequestHandler */
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(400);
    throw new Error("Invalid credentials");
  }

  res.status(200).json({
    _id: user.id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
});

/** @desc Get user data */
/** @route GET /api/users/me */
/** @access Private */
/** @type RequestHandler */
const getMe = asyncHandler(async (req, res, next) => {
  const {
    user: { _id: id, name, email },
  } = req;
  res.json({ id, name, email });
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
