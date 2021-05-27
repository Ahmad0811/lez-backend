const express = require('express');
const { validateStore } = require('../utils/validator');
const {
  getStores,
  createStore,
  deleteStore,
  getStore,
  updateStore
} = require('../controller/stores');

const categoriesRouter = require('./categories');

// const productRouter = require('./products');

const router = express.Router();

router.use('/:storeId/categories', categoriesRouter);
// router.use('/:storeId/products', productRouter);

router.route('/').get(getStores).post(validateStore, createStore);
router
  .route('/:storeId')
  .get(getStore)
  .delete(deleteStore)
  .put(validateStore, updateStore);
module.exports = router;
