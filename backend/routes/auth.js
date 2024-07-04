const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const { verifyToken, isAdmin } = require("../middlewares/auth");

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

//update Password
router.put('/password/update', verifyToken , authController.updatePassword);

//Protected Route
router.get('/user-auth', verifyToken, (req,res)=>{
    res.status(200).send({ok:true})
}
)
router.get('/admin-auth', verifyToken, isAdmin, (req,res)=>{
    res.status(200).send({ok:true})
}
)

module.exports = router;
