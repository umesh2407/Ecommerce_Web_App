const express = require('express');
const router = express.Router();
const authController = require("../controllers/auth");
const { verifyToken } = require('../middlewares/auth');

// Signup route
router.post('/signup',authController.signUpUser);

// Login route
router.post('/login',authController.loginUser);

//LogOut route
router.post('/logout', verifyToken ,authController.logout);


module.exports = router;