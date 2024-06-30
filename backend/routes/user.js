const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const { verifyToken ,  authorizeRoles } = require("../middlewares/auth");

router.get("/me", verifyToken ,userController.getUserDetails);
router.put("/me/update", verifyToken ,userController.updateProfile);
router.get("/getall", verifyToken , authorizeRoles("admin") ,userController.getAllUser); //only Admin can use 
router.get("/:id", verifyToken ,userController.getSingleUser); 
router.put('/update/role/:id', verifyToken, authorizeRoles('admin'),userController.updateUserRole);
router.delete("/:id", verifyToken, authorizeRoles('admin'),userController.deleteUser); 

module.exports = router;