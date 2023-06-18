const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProducts,
  deleteProduct,
  getProductDetails,
} = require("../controllers/productController");

const router = express.Router();

//All product
router.route("/products").get(getAllProducts);

//create product
router.route("/product/new").post(createProduct);

// updateProducts
router.route("/product/:id").put(updateProducts);
// delete products
router
  .route("/product/:id")
  .put(updateProducts)
  .delete(deleteProduct)
  .get(getProductDetails);

module.exports = router;
