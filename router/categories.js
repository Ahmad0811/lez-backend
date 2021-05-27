const express = require('express');
const { validateCategory } = require('../utils/validator');

const {
  createCategory,
  deleteCategory,
  updateCategory,
  getAllCategoriesForStore
} = require('../controller/categories');

const productRouter = require('./products');

const router = express.Router({ mergeParams: true });

router.use('/:categoryId/products', productRouter);

router
  .route('/')
  .get(getAllCategoriesForStore)
  .post(validateCategory, createCategory);
router
  .route('/:categoryId')
  .delete(deleteCategory)
  .put(validateCategory, updateCategory);

module.exports = router;
