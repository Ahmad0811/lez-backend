const express = require('express');
const { validateProduct } = require('../utils/validator');

const {
  getProduct,
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct
} = require('../controller/products');

const router = express.Router({ mergeParams: true });

router.route('/').get(getProducts).post(validateProduct, createProduct);
router
  .route('/:productId')
  .get(getProduct)
  .delete(deleteProduct)
  .put(validateProduct, updateProduct);

module.exports = router;
