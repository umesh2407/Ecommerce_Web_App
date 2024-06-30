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
exports.getProductDetails = async (req, res, next) => {
    const product = await Product.findById(req.params.id);
  
    if (!product) {
        return res.status(404).send({ message: 'Product not found' });
      
    }
  
    res.status(200).json({
      success: true,
      product,
    });
  };
