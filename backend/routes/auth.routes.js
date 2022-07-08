const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logoutUser, getMe } = require("../controllers/userController");
const { validateRegisterUser } = require("../validators/userValidators");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", validateRegisterUser, registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.get("/logout", protect, logoutUser);

module.exports = router;
