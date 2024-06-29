const express = require('express');
const router = express.Router();
const ProductController = require("../controllers/product")


router.get('/getall', ProductController.getallProduct);
router.post('/create/new', ProductController.createProduct);
router.put('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);
router.get('/:id', ProductController.getProductDetails);


module.exports = router;