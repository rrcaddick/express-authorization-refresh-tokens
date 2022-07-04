const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getMe } = require("../controllers/userController");
const { validateRegisterUser } = require("../validators/userValidators");
const { protect } = require("../middleware/authMiddleware");

router.post("/", validateRegisterUser, registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

module.exports = router;
