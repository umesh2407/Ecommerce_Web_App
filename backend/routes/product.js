const express = require('express');
const router = express.Router();
const ProductController = require("../controllers/product");
const { verifyToken, authorizeRoles } = require('../middlewares/auth');

router.get('/getall',ProductController.getallProduct);
router.post('/create/new', verifyToken,ProductController.createProduct); 
router.put('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);
router.get('/:id', ProductController.getProductDetails);
router.post('/review', verifyToken , ProductController.createProductReview);
router.get('/get/reviews',verifyToken,ProductController.getProductReviews);
router.delete('/delete/reviews',verifyToken,ProductController.deleteReview);

module.exports = router;