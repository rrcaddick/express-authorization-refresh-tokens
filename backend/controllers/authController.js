const asyncHandler = require("express-async-handler");
const { RequestHandler } = require("express");
const { validationResult } = require("express-validator");
const createValidationError = require("../utils/createValidationError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { refreshTokenCookieOptions } = require("../config/refreshTokenCookieOptions");

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
    name: user.name,
    email: user.email,
  });
});

/** @desc Authenticate a user */
/** @route POST /api/users/login */
/** @access Public */
/** @type RequestHandler */
const loginUser = asyncHandler(async (req, res, next) => {
  const {
    body: { email, password },
    cookies: { refreshToken: refreshTokenCookie },
  } = req;

  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(400);
    throw new Error("Invalid credentials");
  }

  const refreshToken = await generateRefreshToken(user._id, refreshTokenCookie);

  res
    .clearCookie("refreshToken", refreshTokenCookieOptions)
    .cookie("refreshToken", refreshToken, refreshTokenCookieOptions)
    .status(200)
    .json({
      name: user.name,
      email: user.email,
      token: generateAccessToken(user._id),
    });
});

/** @desc Removes refresh tokens from user */
/** @route GET /api/users/logout */
/** @access Private */
/** @type RequestHandler */
const logoutUser = asyncHandler(async (req, res, next) => {
  const {
    cookies: { refreshToken: refreshTokenCookie },
  } = req;

  if (refreshTokenCookie) {
    await User.revokeRefreshTokens(refreshTokenCookie);
  }

  res.status(200).clearCookie("refreshToken", refreshTokenCookieOptions).json({
    message: "Logout successfull",
  });
});

/** @desc Get user data */
/** @route GET /api/users/me */
/** @access Private */
/** @type RequestHandler */
const refreshToken = asyncHandler(async (req, res, next) => {
  const {
    cookies: { refreshToken: refreshTokenCookie },
  } = req;

  if (!refreshTokenCookie) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }

  const user = await User.findOne({ refreshTokens: refreshTokenCookie });

  // Invalid or reused token
  if (!user) {
    await User.revokeRefreshTokens(refreshTokenCookie);
    res.status(401);
    throw new Error("Forbidden");
  }

  try {
    const refreshSecret = process.env.JWT_REFRESH_SECRET;
    const { userId } = jwt.verify(refreshTokenCookie, refreshSecret);

    if (userId !== user._id.toString()) {
      await User.revokeRefreshTokens(refreshTokenCookie);
      res.status(401);
      throw new Error("Forbidden");
    }

    const refreshToken = await generateRefreshToken(user._id, refreshTokenCookie);

    res
      .clearCookie("refreshToken", refreshTokenCookieOptions)
      .cookie("refreshToken", refreshToken, refreshTokenCookieOptions)
      .status(200)
      .json({
        name: user.name,
        email: user.email,
        token: generateAccessToken(user._id),
      });
  } catch (error) {
    await user.removeRefreshToken(refreshTokenCookie);
    res.status(401).clearCookie("refreshToken", refreshTokenCookieOptions);
    throw new Error("Not authorized");
  }
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

// Generate Access Token
const generateAccessToken = (userId) => {
  const accessExpiry = process.env.ACCESS_TOKEN_EXPIRY;
  const accessSecret = process.env.JWT_ACCESS_SECRET;

  return jwt.sign({ userId }, accessSecret, { expiresIn: accessExpiry });
};

// Generate JWT
const generateRefreshToken = async (userId, oldRefreshToken) => {
  const refreshExpiry = process.env.REFRESH_TOKEN_EXPIRY;
  const refreshSecret = process.env.JWT_REFRESH_SECRET;

  const newRefreshToken = jwt.sign({ userId }, refreshSecret, { expiresIn: refreshExpiry });

  const user = await User.findById(userId);
  await user.recycleRefreshToken(oldRefreshToken, newRefreshToken);

  return newRefreshToken;
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
  getMe,
};
