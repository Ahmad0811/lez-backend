const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  console.log(error);
  res.status(error.statusCode || 500).json({
    success: false,
    msg: error.msg || 'Server Error'
  });
};

module.exports = errorHandler;
