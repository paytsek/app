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
  const company = await Company.findById(req.company._id);
  const user = await User.findById(req.user._id);

  if (
    user.role !== 'admin' &&
    (!company || !user || company.user.toString() !== user._id.toString())
  ) {
    res.status(401);
    return next(new ErrorResponse({ message: 'Not authorized, access denied' }));
  }

  const payrun = await Payrun.findOne({ _id: req.params.id, company: company._id });

  if (!payrun) {
    res.status(404);
    return next(
      new ErrorResponse({
        message: `Resource with an id of ${req.params.id} not found`,
      }),
    );
  }

  return res.status(200).json({ success: true, payrun });
});

// @ROUTE POST /api/v1/payruns
// @Desc Create a payrun for a specific company
// access PRIVATE - Logged in user
const createPayrun = asyncHandler(async (req, res, next) => {
  const company = await Company.findById(req.company._id);
  const user = await User.findById(req.user._id);

  const { startDate, endDate, special } = req.body;

  if (
    user.role !== 'admin' &&
    (!company || !user || company.user.toString() !== user._id.toString())
  ) {
    res.status(401);
    return next(new ErrorResponse({ message: 'Not authorized, access denied' }));
  }

  const payrun = await Payrun.create({
    startDate,
    endDate,
    special,
    company: company._id,
  });

  return res.status(201).json({ success: true, payrun });
});

// @ROUTE PUT /api/v1/payruns/:id
// @Desc Update a payrun by its id for a specific company
// access PRIVATE - Logged in user
const updatePayrun = asyncHandler(async (req, res, next) => {
  res.send('Update Payrun');
});

module.exports = {
  getPayruns,
  getPayrun,
  createPayrun,
  updatePayrun,
};
