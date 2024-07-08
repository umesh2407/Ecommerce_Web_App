const express = require('express');
const router = express.Router();
const { addToWishlist, removeFromWishlist, getWishlist } = require('../controllers/wishlist');
const { verifyToken } = require('../middlewares/auth');

// POST /api/wishlist/add
router.post('/add',verifyToken, addToWishlist);

// DELETE /api/wishlist/remove/:productId
router.delete('/remove/:productId',verifyToken, removeFromWishlist);

// GET /api/wishlist
router.get('/',verifyToken, getWishlist);

module.exports = router;
