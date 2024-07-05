// const Product = require('../models/product');
// const ApiFeatures = require('../utils/apifeautures');

// //Create a Product --Admin
// exports.createProduct = async(req,res)=>{

// req.body.user = req.user.user;

// const product = await Product.create(req.body);

// res.status(201).json({
//     success:true,
//  message: "Product created successfully"
// })
// }

// //Get all Products
// exports.getallProduct = async(req,res)=>{

//     const resultPerPage = 8;
//     const apiFeature = new ApiFeatures(Product.find(), req.query)
//     .search()
//     .filter()
//     .pagination(resultPerPage);

//   let products = await apiFeature.query;

//     res.status(200).json({
//         success:true,
//         products
//     })
// }

// //Update Products --Admin
// exports.updateProduct = async (req, res, next) => {
//     let product = await Product.findById(req.params.id);
  
//     if (!product) {
//         return res.status(404).send({ message: 'Product not found' });
//     }
  
//     // // Images Start Here
//     // let images = [];
  
//     // if (typeof req.body.images === "string") {
//     //   images.push(req.body.images);
//     // } else {
//     //   images = req.body.images;
//     // }
  
//     // if (images !== undefined) {
//     //   // Deleting Images From Cloudinary
//     //   for (let i = 0; i < product.images.length; i++) {
//     //     await cloudinary.v2.uploader.destroy(product.images[i].public_id);
//     //   }
  
//     //   const imagesLinks = [];
  
//     //   for (let i = 0; i < images.length; i++) {
//     //     const result = await cloudinary.v2.uploader.upload(images[i], {
//     //       folder: "products",
//     //     });
  
//     //     imagesLinks.push({
//     //       public_id: result.public_id,
//     //       url: result.secure_url,
//     //     });
//     //   }
  
//     //   req.body.images = imagesLinks;
//     // }
  
//     product = await Product.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//       useFindAndModify: false,
//     });
  
//     res.status(200).json({
//       success: true,
//       product,
//     });
//   };

// //Delete a Product 
// exports.deleteProduct = async (req, res, next) => {
//     const product = await Product.findById(req.params.id);
  
//     if (!product) {
//     return res.status(404).send({ message: 'Product not found' });

//     }
  
//     // // Deleting Images From Cloudinary
//     // for (let i = 0; i < product.images.length; i++) {
//     //   await cloudinary.v2.uploader.destroy(product.images[i].public_id);
//     // }
  
//     await product.deleteOne();
  
//     res.status(200).json({
//       success: true,
//       message: "Product Delete Successfully",
//     });
//   };


// // Get Product Details
// exports.getProductDetails = async (req, res) => {
//     const product = await Product.findById(req.params.id);
  
//     if (!product) {
//         return res.status(404).send({ message: 'Product not found' });
      
//     }
  
//     res.status(200).json({
//       success: true,
//       product,
//     });
//   };

// exports.createProductReview = async (req, res) => {
    
//       const { rating, comment, productId } = req.body;

//       const review = {
//         user: req.user.user,
//         name: req.user.name,
//         rating: Number(rating),
//         comment,
//       };
  
//       const product = await Product.findById(productId);
  
//       if (!product) {
//         return res.status(404).json({
//           success: false,
//           message: "Product not found",
//         });
//       }
  
//       const isReviewed = product.reviews.find(
//         (rev) => rev.user.toString() === req.user.user.toString()
//       );
  
//       if (isReviewed) {
//         product.reviews.forEach((rev) => {
//           if (rev.user.toString() === req.user.user.toString()) {
//             rev.rating = rating;
//             rev.comment = comment;
//           }
//         });
//       } else {
//         product.reviews.push(review);
//         product.NumOfReviews = product.reviews.length;
//       }
  
//       let avg = 0;
  
//       product.reviews.forEach((rev) => {
//         avg += rev.rating;
//       });
  
//       product.rating = avg / product.reviews.length;
  
//       await product.save({ validateBeforeSave: false });
  
//       res.status(200).json({
//         success: true,
//         message:"Product review successfully"
//       });
//   };


// // Get All Reviews of a product
// exports.getProductReviews =async (req, res) => {
//   const product = await Product.findById(req.query.id);

//   if (!product) {
//     return res.status(404).send({ message: 'Product not found' });
//   }
//   res.status(200).json({
//     success: true,
//     reviews: product.reviews,
//   });
// };



// // Delete Review
// exports.deleteReview = async (req, res) => {
//   const product = await Product.findById(req.query.productId);

//   if (!product) {
//     return res.status(404).send({ message: 'Product not found' });
//   }

//   const reviews = product.reviews.filter(
//     (rev) => rev._id.toString() !== req.query.id.toString()
//   );

//   let avg = 0;

//   reviews.forEach((rev) => {
//     avg += rev.rating;
//   });

//   let rating = 0;

//   if (reviews.length === 0) {
//     rating = 0;
//   } else {
//     rating = avg / reviews.length;
//   }

//   const numOfReviews = reviews.length;

//   await Product.findByIdAndUpdate(
//     req.query.productId,
//     {
//       reviews,
//       rating,
//       numOfReviews,
//     },
//     {
//       new: true,
//       runValidators: true,
//       useFindAndModify: false,
//     }
//   );

//   res.status(200).json({
//     success: true,
//     message: "Review Deleted successfully"
//   });
// };

const productModel = require("../models/product.js");
const categoryModel = require("../models/category.js");
// import orderModel from "../models/orderModel.js";

const fs = require ("fs");
const slugify  = require("slugify");
// import braintree from "braintree";
// import dotenv from "dotenv";

// dotenv.config();

//payment gateway
// var gateway = new braintree.BraintreeGateway({
//   environment: braintree.Environment.Sandbox,
//   merchantId: process.env.BRAINTREE_MERCHANT_ID,
//   publicKey: process.env.BRAINTREE_PUBLIC_KEY,
//   privateKey: process.env.BRAINTREE_PRIVATE_KEY,
// });

exports.createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in crearing product",
    });
  }
};

//get all products
exports.getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: products.length,
      message: "ALlProducts ",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting products",
      error: error.message,
    });
  }
};

// get single product
exports. getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single product",
      error,
    });
  }
};

// get photo
exports.productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};

//delete controller
exports.deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

//upate producta
exports.updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte product",
    });
  }
};

// filters
exports.productFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering Products",
      error,
    });
  }
};

// product count
exports.productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

// product list base on page
exports.productListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};

// search product
exports.searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const resutls = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(resutls);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};

// similar products
exports.realtedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
};

// get prdocyst by catgory
exports.productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }
};

// //payment gateway api
// //token
// exports.braintreeTokenController = async (req, res) => {
//   try {
//     gateway.clientToken.generate({}, function (err, response) {
//       if (err) {
//         res.status(500).send(err);
//       } else {
//         res.send(response);
//       }
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// //payment
// exports.brainTreePaymentController = async (req, res) => {
//   try {
//     const { nonce, cart } = req.body;
//     let total = 0;
//     cart.map((i) => {
//       total += i.price;
//     });
//     let newTransaction = gateway.transaction.sale(
//       {
//         amount: total,
//         paymentMethodNonce: nonce,
//         options: {
//           submitForSettlement: true,
//         },
//       },
//       function (error, result) {
//         if (result) {
//           const order = new orderModel({
//             products: cart,
//             payment: result,
//             buyer: req.user._id,
//           }).save();
//           res.json({ ok: true });
//         } else {
//           res.status(500).send(error);
//         }
//       }
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };