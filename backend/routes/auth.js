const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const { verifyToken } = require("../middlewares/auth");

// Signup route
router.post("/signup", authController.signUpUser);

// Login route
router.post("/login", authController.loginUser);

//LogOut route
router.get("/logout", verifyToken, authController.logout);

//Forgot password
router.post("/password/forgot", authController.forgotPassword);

//Reset Password
router.put("/password/reset/:token", authController.resetPassword);

module.exports = router;
