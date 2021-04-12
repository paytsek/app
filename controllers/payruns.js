const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

const Company = require('../models/Company');
const User = require('../models/User');
const Payrun = require('../models/Payrun');

// @ROUTE GET /api/v1/payruns
// @Desc Get a payruns for a specific company
// access PRIVATE - Logged in user
const getPayruns = asyncHandler(async (req, res, next) => {
  const company = await Company.findById(req.company._id);
  const user = await User.findById(req.user._id);

  if (
    user.role !== 'admin' &&
    (!company || !user || company.user.toString() !== user._id.toString())
  ) {
    res.status(401);
    return next(new ErrorResponse({ message: 'Not authorized, access denied' }));
  }

  const payruns = await Payrun.find({ company: company._id });

  return res.status(200).json({ success: true, payruns });
});

// @ROUTE GET /api/v1/payruns/:id
// @Desc Get a payrun by its id for a specific company
// access PRIVATE - Logged in user
const getPayrun = asyncHandler(async (req, res, next) => {
  return res.status(200).send('Get payrun');
});

module.exports = {
  getPayruns,
  getPayrun,
};
