const db = require('../db/db');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all products
// @route   GET /api/products
// @access  Private
exports.getProducts = asyncHandler(async (req, res, next) => {
  // TODO simplify
  if (req.query.categoryId) {
    const products = await db
      .select()
      .from('products')
      .where({ category_id: req.query.categoryId });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
      msg: null
    });
  } else if (req.query.storeId) {
    const products = await db
      .select()
      .from('products')
      .where({ store_id: req.query.storeId });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
      msg: null
    });
  } else {
    const products = await db.select().from('products');

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
      msg: null
    });
  }
});

// @desc    Get product by id
// @route   GET /api/products/:id
// @access  Private
exports.getProduct = asyncHandler(async (req, res, next) => {
  const productId = req.params.productId;

  const product = await db
    .select()
    .from('products')
    .where('product_id', productId);

  if (product.length == 0) {
    return next(new ErrorResponse(`No product with id of ${productId}`, 404));
  }

  res.status(200).json({
    success: true,
    count: product.length,
    data: product,
    msg: null
  });
});

// @desc    Create product
// @route   POST /api/products
// @access  Private
exports.createProduct = asyncHandler(async (req, res, next) => {
  // TODO logo and checking data
  const { categoryId, storeId } = req.params;
  const { name, price } = req.body;

  const checkStore = await db
    .select()
    .from('stores')
    .where('store_id', storeId)
    .catch((err) => {
      return next(err);
    });

  const checkCategory = await db
    .select()
    .from('categories')
    .where('category_id', categoryId)
    .catch((err) => {
      return next(err);
    });

  if (checkStore.length != 0) {
    if (checkCategory != 0) {
      if (!req.files) {
        return next(new ErrorResponse(`Please upload a file`, 400));
      }
      const file = req.files.file;
      if (!file.mimetype.startsWith('image')) {
        return next(new ErrorResponse(`Please upload an image file`, 400));
      }

      if (file.size > 1000000) {
        return next(
          new ErrorResponse(`Please upload an image less than ${1000000}`, 400)
        );
      }

      file.name = `product_${uniqid()}${path.parse(file.name).ext}`;

      file.mv(`./public/uploads/${file.name}`, async (err) => {
        if (err) {
          console.error(err);
          return next(new ErrorResponse(`Problem with file upload`, 500));
        }
      });

      const product = await db('products')
        .insert({
          store_id: storeId,
          category_id: categoryId,
          name: name,
          img: file.name,
          price: price
        })
        .catch((err) => {
          return next(err);
        })
        .then((row) => {
          return db.select().from('products').where({ product_id: row[0] });
        })
        .catch((err) => {
          return next(err);
        });

      return res.status(201).json({
        success: true,
        count: product.length,
        data: product,
        msg: 'Product has been created'
      });
    } else {
      return next(
        new ErrorResponse(`No category found with id of ${categoryId}`, 404)
      );
    }
  } else {
    return next(new ErrorResponse(`No store found with id of ${storeId}`, 404));
  }
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const productId = req.params.productId;
  // TODO logo and checking data
  const { name, price } = req.body;

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }
  const file = req.files.file;
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  if (file.size > 1000000) {
    return next(
      new ErrorResponse(`Please upload an image less than ${1000000}`, 400)
    );
  }

  file.name = `product_${uniqid()}${path.parse(file.name).ext}`;

  file.mv(`./public/uploads/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }
  });

  const product = await db('products')
    .where('product_id', productId)
    .update({ name: name, img: file.name, price: price });

  if (product == []) {
    return next(
      new ErrorResponse(`No product found with id of ${productId}`, 404)
    );
  }

  res.status(201).json({
    success: true,
    count: product.length,
    data: product,
    msg: 'Product has been updated'
  });
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const productId = req.params.productId;

  const product = await db('products').where('product_id', productId).del();

  if (product == []) {
    return next(
      new ErrorResponse(`No product found with id of ${productId}`, 404)
    );
  }

  res.status(201).json({
    success: true,
    count: product.length,
    data: product,
    msg: 'Product has been Deleted'
  });
});
