const express = require('express');
const { verifyToken } = require('../middlewares/auth');
const router = express.Router();
const WishlistController = require("../controllers/wishlist");
// const { addToWishlist, removeFromWishlist, getWishlist } = require('../controllers/wishlist');

// POST /api/wishlist/add
router.post('/add',verifyToken, WishlistController.addToWishlist);

// DELETE /api/wishlist/remove/:productId
router.delete('/remove/:productId',verifyToken, WishlistController.removeFromWishlist);

// GET /api/wishlist
router.get('/',verifyToken,WishlistController.getWishlist);

module.exports = router;
