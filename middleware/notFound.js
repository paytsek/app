const ErrorResponse = require('../utils/errorResponse');

const notFound = (req, res, next) => {
  res.status(404);
  next(new ErrorResponse({ message: `Not found - ${req.originalUrl}` }));
};

module.exports = notFound;
