const Wishlist = require('../models/wishlist');
const productModel = require('../models/product');

// Add a product to the wishlist
exports.addToWishlist = async (req, res) => {
    const { productId } = req.body; // Extract productId from request body
    const userId  = req.user.user; // Extract userId from authenticated user (assuming it's available in req.user)
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
  
      return res.status(200).json({ message: 'Product added to wishlist successfully' });
    } catch (error) {
      console.error('Error adding product to wishlist:', error);
      return res.status(500).json({ message: 'Failed to add product to wishlist', error: error.errors });
    }
  };
  
// Remove a product from the wishlist
exports.removeFromWishlist = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user.user;

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
    const userId = req.user.user;
  
    try {
      const wishlist = await Wishlist.findOne({ user: userId }).populate('products');
  
      if (!wishlist) {
        return res.status(404).json({ message: 'Wishlist not found' });
      }
  
      // Fetch photos for each product
      const productsWithPhotos = await Promise.all(wishlist.products.map(async (product) => {
        const productWithPhoto = await productModel.findById(product._id).select('photo');
        if (productWithPhoto && productWithPhoto.photo && productWithPhoto.photo.data) {
          return {
            ...product.toObject(),
            photo: {
              data: productWithPhoto.photo.data.toString('base64'), // Convert binary data to base64 string
              contentType: productWithPhoto.photo.contentType,
            },
          };
        }
        return product.toObject();
      }));
  
      res.status(200).json({
        success: true,
        message: 'Wishlist fetched successfully',
        products: productsWithPhotos,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch wishlist' });
    }
  };
  