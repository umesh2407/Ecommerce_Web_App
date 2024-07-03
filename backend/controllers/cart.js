const Cart = require('../models/cart');
const Product = require('../models/product');

// Add item to cart
exports.addItemToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).send({ message: 'Product not found' });
  }

  let cart = await Cart.findOne({ user: req.user.user });

  if (cart) {
    const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);

    if (itemIndex > -1) {
      // Update quantity if item exists
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      cart.items.push({ product: productId, quantity });
    }
  } else {
    // Create new cart for user
    cart = new Cart({
      user: req.user.user,
      items: [{ product: productId, quantity }],
    });
  }

  await cart.save();

  res.status(200).json({
    success: true,
    cart,
  });
};

// Update item quantity in cart
exports.updateCartItem = async (req, res) => {
  const { productId, quantity } = req.body;

  let cart = await Cart.findOne({ user: req.user.user });
  if (!cart) {
    return res.status(404).send({ message: 'Cart not found' });
  }

  const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity = quantity;
  } else {
    return res.status(404).send({ message: 'Item not found in cart' });
  }

  await cart.save();

  res.status(200).json({
    success: true,
    cart,
  });
};

// Remove item from cart
exports.removeItemFromCart = async (req, res) => {
    //itemid is the productid
  const { itemId } = req.params;
  let cart = await Cart.findOne({ user: req.user.user });
  if (!cart) {
    return res.status(404).send({ message: 'Cart not found' });
  }

  cart.items = cart.items.filter((item) => item.product.toString() !== itemId);

  await cart.save();

  res.status(200).json({
    success: true,
    cart,
  });
};

// Get user's cart
exports.getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.user }).populate('items.product', 'name price');

  if (!cart) {
    return res.status(404).send({ message: 'Cart not found' });
  }

  res.status(200).json({
    success: true,
    cart,
  });
};
