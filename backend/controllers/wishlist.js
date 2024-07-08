const Wishlist = require('../models/wishlist');

// Add a product to the wishlist
exports.addToWishlist = async (req, res) => {
  const { productId } = req.body;
  const { userId } = req.user; // Assuming userId is available in req.user after authentication

  try {
    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, products: [productId] });
      await wishlist.save();
    } else {
      if (!wishlist.products.includes(productId)) {
        wishlist.products.push(productId);
        await wishlist.save();
      }
    }

    res.status(200).json({ message: 'Product added to wishlist successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add product to wishlist' });
  }
};

// Remove a product from the wishlist
exports.removeFromWishlist = async (req, res) => {
  const { productId } = req.params;
  const { userId } = req.user;

  try {
    const wishlist = await Wishlist.findOneAndUpdate(
      { user: userId },
      { $pull: { products: productId } },
      { new: true }
    );

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    res.status(200).json({ message: 'Product removed from wishlist successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to remove product from wishlist' });
  }
};

// Get user's wishlist
exports.getWishlist = async (req, res) => {
  const { userId } = req.user;

  try {
    const wishlist = await Wishlist.findOne({ user: userId }).populate('products');

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    res.status(200).json(wishlist.products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch wishlist' });
  }
};
