const { body } = require("express-validator");
const User = require("../models/userModel");

const validateRegisterUser = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isAlpha()
    .withMessage("Name should not contain numbers or special characters")
    .trim(),
  body("email", "Please enter a valid email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user) throw new Error("User already exists");
      return true;
    }),
  body("password").isLength({ min: 4, max: 12 }).withMessage("Password should be between 4 and 12 characters long"),
  body("confirmPassword").custom((confirmPassword, { req }) => {
    if (confirmPassword !== req.body.password) throw new Error("Passwords do not match");
    return true;
  }),
];

module.exports = {
  validateRegisterUser,
};
