const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logoutUser, refreshToken, getMe } = require("../controllers/authController");
const { validateRegisterUser } = require("../validators/userValidators");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", validateRegisterUser, registerUser);
router.post("/login", loginUser);
router.get("/refreshToken", refreshToken);
router.get("/me", protect, getMe);

module.exports = router;
