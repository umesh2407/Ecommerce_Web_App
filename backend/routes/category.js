const express = require("express");
const { isAdmin, verifyToken }= require( "./../middlewares/auth.js");
const categoryController = require("../controllers/category.js");
const router = express.Router();

// create category
router.post(
  "/create-category",
 verifyToken,
  isAdmin, categoryController.createCategory
);

//update category
router.put(
  "/update-category/:id",
 verifyToken,
  isAdmin,
categoryController.updateCategory
);

//getALl category
router.get("/get-category", categoryController.Getcategory);

//single category
router.get("/single-category/:slug", categoryController.singleCategory);

//delete category
router.delete(
  "/delete-category/:id",
 verifyToken,
  isAdmin,
categoryController.deleteCategory
);

module.exports = router;

