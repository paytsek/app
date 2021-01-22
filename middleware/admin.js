const asyncHandler = require('./asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

const admin = asyncHandler(async (req, res, next) => {
  const { role } = req.user && req.user;

  if (role !== 'admin') {
    res.status(403);
    return next(
      new ErrorResponse({
        message: "You don't have permission to access on this route",
      }),
    );
  }

  return next();
});

module.exports = admin;
