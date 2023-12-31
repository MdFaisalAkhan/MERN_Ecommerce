const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

// Create Product
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

//get All product
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const resultPerpage = 5; /* for pagination */
  const productCount = await Product.countDocuments(); // for frontend intigration
  const ApiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerpage);
  const products = await ApiFeature.query;

  res.status(200).json({
    success: true,
    products,
    productCount,
  });
});

// get product details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Poduct not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

// update Product --Admin

exports.updateProducts = catchAsyncErrors(async (req, res, next) => {
  let product = Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Poduct not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

// Delete

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Poduct not found", 404));
  }
  await product.remove();
  res.status(200).json({
    success: true,
    message: "Product Delete Success",
  });
});
