const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  user: { type: mongoose.ObjectId, ref: "User"},
  products: [{ type: mongoose.ObjectId, ref: "Product" }],
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);
module.exports = Wishlist;
