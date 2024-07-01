const Order = require("../models/order");
const Product = require("../models/product");

// Create new Order
exports.newOrder = async (req, res) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user.user,
  });

  res.status(201).json({
    success: true,
    order,
  });
};

// get Single Order
exports.getSingleOrder = async (req, res ) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return res.status(404).send({ message: 'Order not found with this ID' });
  }

  res.status(200).json({
    success: true,
    order,
  });
};

// get logged in user  Orders
exports.myOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.user });

  res.status(200).json({
    success: true,
    orders,
  });
};

// Get all Orders -- Admin
exports.getAllOrders = async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
};

// Update Order Status -- Admin
exports.updateOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).send({ message: 'Order not found with this ID' });
  }

  if (order.orderStatus === "Delivered") {
    return res.status(404).send({ message: 'You have already delivered this order' });
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
  }
  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    message:"Order Updated successfuly"
  });
};

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.Stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

// Delete Order -- Admin
exports.deleteOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).send({ message: 'Order not found with this ID' });
  }

  await order.deleteOne();

  res.status(200).json({
    success: true,
    message:"Order Deleted successfuly"
  });
};
