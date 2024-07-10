const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const { verifyToken, isAdmin } = require("../middlewares/auth");

router.get("/me", verifyToken ,userController.getUserDetails);
router.put("/me/update", verifyToken ,userController.updateProfile);
router.get("/getall", verifyToken , isAdmin ,userController.getAllUser); //only Admin can use 
router.get("/:id", verifyToken ,userController.getSingleUser); 
router.put('/update/role/:id', verifyToken, isAdmin ,userController.updateUserRole);
router.delete("/:id", verifyToken, isAdmin ,userController.deleteUser); 

module.exports = router;