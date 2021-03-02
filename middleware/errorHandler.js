/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const ErrorResponse = require('../utils/errorResponse.js');
require('colors');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  if (process.env.NODE_ENV === 'development') {
    console.log(err.stack.red);
  }

  if (err.code === 11000) {
    res.status(error.statusCode || 400);
    error = new ErrorResponse({ message: 'Duplicate field value entered' });
  }

  if (err.name === 'CastError') {
    res.status(error.statusCode || 404);
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

    res.status(error.statusCode || 400);
    error = new ErrorResponse({ ...validationError.errors });
  }

  res.status(error.statusCode ? error.statusCode : res.statusCode || 500);
  res.json({ success: false, ...error });
};

module.exports = errorHandler;
