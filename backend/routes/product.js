const express = require('express');
const ProductController = require("../controllers/product");

const { isAdmin, verifyToken } = require("../middlewares/auth");
const formidable = require("express-formidable");

const router = express.Router();

//routes
router.post(
  "/create-product",
  verifyToken,
  isAdmin,
  formidable(),
ProductController.createProductController
);

router.put(
  "/update-product/:pid",
  verifyToken,
  isAdmin,
  formidable(),
ProductController.updateProductController
);

//get products
router.get("/get-product", ProductController.getProductController);

//single product
router.get("/get-product/:slug", ProductController.getSingleProductController);

//get photo
router.get("/product-photo/:pid", ProductController.productPhotoController);

//delete rproduct
router.delete("/delete-product/:pid", ProductController.deleteProductController);

//filter product
router.post("/product-filters", ProductController.productFiltersController);

//product count
router.get("/product-count", ProductController.productCountController);

//product per page
router.get("/product-list/:page", ProductController.productListController);

//search product
router.get("/search/:keyword", ProductController.searchProductController);

//similar product
router.get("/related-product/:pid/:cid", ProductController.realtedProductController);

//category wise product
router.get("/product-category/:slug", ProductController.productCategoryController);

//payments routes
//token
router.get("/braintree/token", ProductController.braintreeTokenController);

//payments
router.post("/braintree/payment", verifyToken, ProductController.brainTreePaymentController);

//invoice 
router.post('/send-invoice', ProductController.sendInvoice);

//reviews
router.post('/review',verifyToken, ProductController.createProductReview);
router.get('/review/getall', ProductController.getProductReviews);
router.delete('/review/delete',verifyToken, ProductController.deleteReview);

module.exports = router;
