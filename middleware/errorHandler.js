/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const ErrorResponse = require('../utils/errorResponse.js');
require('colors');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  if (process.env.NODE_ENV === 'development') {
    console.log(err.stack.red);
  }

  console.log(error);

  if (err.code === 11000) {
    res.status(400);
    error = new ErrorResponse({ message: 'Duplicate field value entered' });
  }

  if (err.name === 'CastError') {
    res.status(404);
    error = new ErrorResponse({
      message: `Resource with an id of ${error.value} not found`,
    });
  }

  if (err.name === 'ValidationError') {
    const validationError = { ...err };
    const errorFields = Object.keys(error.errors);

    errorFields.forEach((field) => {
      validationError.errors[field] = validationError.errors[field].message;
    });

    res.status(400);
    error = new ErrorResponse({ ...validationError.errors });
  }

  res.status(res.statusCode === 200 ? 500 : res.statusCode);
  res.json({ success: false, ...error });
};

module.exports = errorHandler;
