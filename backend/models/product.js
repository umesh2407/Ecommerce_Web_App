// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const ProductSchema = new Schema({
//   name: {
//     type: String,
//     required: [true, "Please Enter Product Name"],
//   },
//   description: {
//     type: String,
//     required: [true, "Please Enter Product Description"],
//   },
//   price: {
//     type: Number,
//     required: [true, "Please Enter Product Price"],
//     maxLength: [8, "Price can't exceeds 8 characters"],
//   },
//   rating: {
//     type: Number,
//     default: 0,
//   },
//   images: [
//     {
//       public_id: {
//         type: String,
//         required: true,
//       },
//       url: {
//         type: String,
//         required: true,
//       },
//     },
//   ],

//   category: {
//     type: String,
//     required: [true, "Please Enter Product category"],
//   },

//   Stock: {
//     type: Number,
//     required: [true, "Please enter the product stock"],
//     maxLength: [4, "Stock can-not exceeds characters"],
//     default: 1,
//   },

//   NumOfReviews: {
//     type: Number,
//     default: 0,
//   },

//   reviews: [
//     {
//       name: {
//         type: String,
//         required: true,
//       },
//       rating: {
//         type: String,
//         required: true,
//       },
//       comment: {
//         type: String,
//         required: true,
//       },
//     },
//   ],

//   user:{
//     type: mongoose.Schema.ObjectId,
//     ref:"User",
//     required: true
//   },

//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const Product = mongoose.model("Product", ProductSchema);

// module.exports = Product;
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.ObjectId,
      ref: "Category",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    shipping: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
