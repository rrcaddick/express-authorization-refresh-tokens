const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getMe } = require("../controllers/userController");
const { validateRegisterUser } = require("../validators/userValidators");

router.post("/", validateRegisterUser, registerUser);
router.post("/login", loginUser);
router.get("/me", getMe);

module.exports = router;
