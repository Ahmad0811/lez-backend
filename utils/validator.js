const { check, validationResult } = require('express-validator');

exports.validateStore = [
  check('name')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Store name can not be empty!')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Minimum 3 characters required!')
    .bail(),
  check('description')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Store Description is required')
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  }
];

exports.validateProduct = [
  check('name')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Product name can not be empty!')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Minimum 3 characters required!')
    .bail(),
  check('price').not().isEmpty().withMessage('Price is required').bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  }
];

exports.validateCategory = [
  check('name')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Category name can not be empty!')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Minimum 3 characters required!')
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }
];
