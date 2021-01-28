const asyncHandler = require('./asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

const Company = require('../models/Company');

const slug = asyncHandler(async (req, res, next) => {
  const company = await Company.findOne({ slug: req.company.slug });

  if (!company) {
    res.status(403);
    return next(
      new ErrorResponse({
        message: 'No Company, access denied',
      }),
    );
  }

  return next();
});

module.exports = slug;
