const asyncHandler = require('./asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

const Company = require('../models/Company');

const tenant = asyncHandler(async (req, res, next) => {
  let companyTenant;

  if (req.headers['x-company-tenant']) {
    companyTenant = req.headers['x-company-tenant'];
  }

  if (!companyTenant) {
    res.status(401);
    return next(new ErrorResponse({ message: 'No tenant, access denied' }));
  }

  const company = await Company.findOne({ slug: companyTenant });

  if (!company) {
    res.status(401);
    return next(new ErrorResponse({ message: 'No Company, access denied' }));
  }

  req.company = company;

  return next();
});

module.exports = tenant;
