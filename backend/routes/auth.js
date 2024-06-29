const express = require('express');
const router = express.Router();
const authController = require("../controllers/auth")

// Signup route
router.post('/signup',authController.signUpUser);

// Login route
router.post('/login',authController.loginUser);

module.exports = router;