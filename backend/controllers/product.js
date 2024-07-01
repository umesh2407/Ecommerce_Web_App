const Product = require('../models/product');
const ApiFeatures = require('../utils/apifeautures');

//Create a Product --Admin
exports.createProduct = async(req,res)=>{

req.body.user = req.user.user;

const product = await Product.create(req.body);

res.status(201).json({
    success:true,
 message: "Product created successfully"
})
}

//Get all Products
exports.getallProduct = async(req,res)=>{

    const resultPerPage = 8;
    const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  let products = await apiFeature.query;

    res.status(200).json({
        success:true,
        products
    })
}

//Update Products --Admin
exports.updateProduct = async (req, res, next) => {
    let product = await Product.findById(req.params.id);
  
    if (!product) {
        return res.status(404).send({ message: 'Product not found' });
    }
  
    // // Images Start Here
    // let images = [];
  
    // if (typeof req.body.images === "string") {
    //   images.push(req.body.images);
    // } else {
    //   images = req.body.images;
    // }
  
    // if (images !== undefined) {
    //   // Deleting Images From Cloudinary
    //   for (let i = 0; i < product.images.length; i++) {
    //     await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    //   }
  
    //   const imagesLinks = [];
  
    //   for (let i = 0; i < images.length; i++) {
    //     const result = await cloudinary.v2.uploader.upload(images[i], {
    //       folder: "products",
    //     });
  
    //     imagesLinks.push({
    //       public_id: result.public_id,
    //       url: result.secure_url,
    //     });
    //   }
  
    //   req.body.images = imagesLinks;
    // }
  
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
      product,
    });
  };

//Delete a Product 
exports.deleteProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id);
  
    if (!product) {
    return res.status(404).send({ message: 'Product not found' });

    }
  
    // // Deleting Images From Cloudinary
    // for (let i = 0; i < product.images.length; i++) {
    //   await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    // }
  
    await product.deleteOne();
  
    res.status(200).json({
      success: true,
      message: "Product Delete Successfully",
    });
  };


// Get Product Details
exports.getProductDetails = async (req, res) => {
    const product = await Product.findById(req.params.id);
  
    if (!product) {
        return res.status(404).send({ message: 'Product not found' });
      
    }
  
    res.status(200).json({
      success: true,
      product,
    });
  };

exports.createProductReview = async (req, res) => {
    
      const { rating, comment, productId } = req.body;

      const review = {
        user: req.user.user,
        name: req.user.name,
        rating: Number(rating),
        comment,
      };
  
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }
  
      const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user.user.toString()
      );
  
      if (isReviewed) {
        product.reviews.forEach((rev) => {
          if (rev.user.toString() === req.user.user.toString()) {
            rev.rating = rating;
            rev.comment = comment;
          }
        });
      } else {
        product.reviews.push(review);
        product.NumOfReviews = product.reviews.length;
      }
  
      let avg = 0;
  
      product.reviews.forEach((rev) => {
        avg += rev.rating;
      });
  
      product.rating = avg / product.reviews.length;
  
      await product.save({ validateBeforeSave: false });
  
      res.status(200).json({
        success: true,
        message:"Product review successfully"
      });
  };


// Get All Reviews of a product
exports.getProductReviews =async (req, res) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return res.status(404).send({ message: 'Product not found' });
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
};



// Delete Review
exports.deleteReview = async (req, res) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return res.status(404).send({ message: 'Product not found' });
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let rating = 0;

  if (reviews.length === 0) {
    rating = 0;
  } else {
    rating = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      rating,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
};