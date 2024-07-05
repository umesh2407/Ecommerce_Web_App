// const express = require('express');
// const router = express.Router();
// const ProductController = require("../controllers/product");
// const { verifyToken, authorizeRoles } = require('../middlewares/auth');

// router.get('/getall',ProductController.getallProduct);
// router.post('/create/new', verifyToken,ProductController.createProduct); 
// router.put('/:id', ProductController.updateProduct);
// router.delete('/:id', ProductController.deleteProduct);
// router.get('/:id', ProductController.getProductDetails);
// router.post('/review', verifyToken , ProductController.createProductReview);
// router.get('/get/reviews',verifyToken,ProductController.getProductReviews);
// router.delete('/delete/reviews',verifyToken,ProductController.deleteReview);

// module.exports = router;

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

// //payments routes
// //token
// router.get("/braintree/token", braintreeTokenController);

// //payments
// router.post("/braintree/payment", verifyToken, brainTreePaymentController);

module.exports = router;
