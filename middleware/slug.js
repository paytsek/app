const asyncHandler = require('./asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

const Company = require('../models/Company');

const slug = asyncHandler(async (req, res, next) => {
  let companySlug;

  if (req.headers['x-company-slug']) {
    companySlug = req.headers['x-company-slug'];
  }

  if (!companySlug) {
    res.status(401);
    return next(new ErrorResponse({ message: 'No slug, access denied' }));
  }

  const company = await Company.findOne({ slug: companySlug });

  if (!company) {
    res.status(401);
    return next(new ErrorResponse({ message: 'No Company, access denied' }));
  }

  req.company = company;

  return next();
});

module.exports = slug;
