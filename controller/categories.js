const db = require('../db/db');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all categories for a store
// @route   GET /api/stores/:storeId/categories
// @access  Private
exports.getAllCategoriesForStore = asyncHandler(async (req, res, next) => {
  const storeId = req.params.storeId;

  const categories = await db
    .select()
    .from('categories')
    .where('store_id', storeId);

  res.status(200).json({
    success: true,
    count: categories.length,
    data: categories,
    msg: null
  });
});

// @desc    Create category
// @route   POST /api/stores/:storeId/categories
// @access  Private
exports.createCategory = asyncHandler(async (req, res, next) => {
  // TODO logo and checking data
  const storeId = req.params.storeId;
  const name = req.body.name;

  const checkStore = await db
    .select()
    .from('stores')
    .where('store_id', storeId)
    .catch((err) => {
      return next(err);
    });

  // console.log(check);
  if (checkStore.length != 0) {
    const category = await db('categories')
      .insert({
        store_id: storeId,
        name: name
      })
      .catch((err) => {
        return next(err);
      })
      .then(function (row) {
        return db.select().from('categories').where('category_id', row[0]);
      })
      .catch((err) => {
        return next(err);
      });

    return res.status(201).json({
      success: true,
      count: category.length,
      data: category[0],
      msg: 'Category has been created'
    });
  } else {
    return next(new ErrorResponse(`No store found with id of ${storeId}`, 404));
  }
});

// @desc    Create category
// @route   PUT /api/categories/:categoryId
// @access  Private
exports.updateCategory = asyncHandler(async (req, res, next) => {
  // TODO logo and checking data
  const categoryId = req.params.categoryId;
  const name = req.body.name;

  const category = await db('categories')
    .where('category_id', categoryId)
    .update({ name: name });

  if (category == []) {
    return next(
      new ErrorResponse(`No category found with id of ${categoryId}`, 404)
    );
  }

  res.status(201).json({
    success: true,
    count: category.length,
    data: category,
    msg: 'Category has been updated'
  });
});

// @desc    Create category
// @route   DELETE /api/categories/:categoryId
// @access  Private
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const categoryId = req.params.categoryId;

  const category = await db('categories')
    .where('category_id', categoryId)
    .del()
    .catch((err) => {
      return next(err);
    });

  if (category == []) {
    return next(
      new ErrorResponse(`No category found with id of ${categoryId}`, 404)
    );
  }

  await db('products').where({ category_id: categoryId });

  res.status(201).json({
    success: true,
    count: category.length,
    data: category,
    msg: 'Category has been Deleted'
  });
});
