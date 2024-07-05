const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const { verifyToken, isAdmin } = require("../middlewares/auth");

// Signup route
router.post("/signup", authController.signUpUser);

// Login route
router.post("/login", authController.loginUser);

//update user profile
router.put('/update', verifyToken, authController.updateUserProfile)

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

//orders
router.get("/orders",verifyToken,authController.getOrdersController);

//all orders
router.get("/all-orders",verifyToken, isAdmin, authController.getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
 verifyToken,
  isAdmin,
 authController.orderStatusController
);

module.exports = router;
