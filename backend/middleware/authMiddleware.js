const jwt = require("jsonwebtoken");
const { RequestHandler } = require("express");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

/** @type RequestHandler */
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      const user = await User.findById(decoded.userId).select("-password");

      // Check if user previously logged out
      if (user.refreshTokens.length === 0) {
        res.status(401);
        throw new Error("Not authorized, user logged out");
      }

      req.user = user;
      next();
    } catch (error) {
      res.status(403);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(403);
    throw new Error("Not authorized, no token");
  }
});

module.exports = {
  protect,
};
