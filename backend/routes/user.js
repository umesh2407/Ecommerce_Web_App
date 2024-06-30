const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const { verifyToken } = require("../middlewares/auth");


router.get("/me", verifyToken ,userController.getUserDetails);

module.exports = router;