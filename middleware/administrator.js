const asyncHandler = require('./asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

const administrator = asyncHandler(async (req, res, next) => {
  const isAdministrator = req.company.administrators.some(
    (admin) => admin.toString() === req.user._id.toString(),
  );

  if (!isAdministrator) {
    res.status(403);
    return next(
      new ErrorResponse({
        message: "You don't have permission to access on this route",
      }),
    );
  }

  return next();
});

module.exports = administrator;
