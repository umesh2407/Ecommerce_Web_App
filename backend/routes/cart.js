const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cart');
const { verifyToken } = require('../middlewares/auth');

router.post('/add', verifyToken, CartController.addItemToCart);
router.put('/update', verifyToken, CartController.updateCartItem);
router.delete('/remove/:itemId', verifyToken, CartController.removeItemFromCart);
router.get('/mycart', verifyToken, CartController.getCart);

module.exports = router;
