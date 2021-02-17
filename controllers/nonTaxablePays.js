const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const NonTaxablePay = require('../models/NonTaxablePay');
const Company = require('../models/Company');
const User = require('../models/User');

// @ROUTE GET /api/v1/nonTaxablePays/
// @Desc Get nonTaxablePays for a specific company
// access PRIVATE - Logged in user
const getNonTaxablePays = asyncHandler(async (req, res, next) => {
  const company = await Company.findById(req.company._id);
  const user = await User.findById(req.user._id);

  if (
    user.role !== 'admin' &&
    (!company || !user || company.user.toString() !== user._id.toString())
  ) {
    res.status(401);
    return next(new ErrorResponse({ message: 'Not authorized, access denied' }));
  }

  const nonTaxablePays = await NonTaxablePay.find({ company: company._id });

  return res.status(200).json({ success: true, nonTaxablePays });
});

// @ROUTE GET /api/v1/nonTaxablePays/:id
// @Desc Get single non taxable Pay for a specific company
// access PRIVATE - Logged in user
const getNonTaxablePay = asyncHandler(async (req, res, next) => {
  const company = await Company.findById(req.company._id);
  const user = await User.findById(req.user._id);

  if (
    user.role !== 'admin' &&
    (!company || !user || company.user.toString() !== user._id.toString())
  ) {
    res.status(401);
    return next(new ErrorResponse({ message: 'Not authorized, access denied' }));
  }

  const nonTaxablePay = await NonTaxablePay.findOne({ company: company._id, _id: req.params.id });

  if (!nonTaxablePay) {
    res.status(404);
    return next(
      new ErrorResponse({ message: `Resource with an id of ${req.params.id} not found` }),
    );
  }

  return res.status(200).json({ success: true, nonTaxablePay });
});

// @ROUTE POST /api/v1/nonTaxablePays
// @Desc Create a non taxable Pay for a specific company
// access PRIVATE - Logged in user
const createNonTaxablePay = asyncHandler(async (req, res, next) => {
  const { name } = req.body;

  const company = await Company.findById(req.company._id);
  const user = await User.findById(req.user._id);

  if (
    user.role !== 'admin' &&
    (!company || !user || company.user.toString() !== user._id.toString())
  ) {
    res.status(401);
    return next(new ErrorResponse({ message: 'Not authorized, access denied' }));
  }

  const nonTaxablePay = await NonTaxablePay.create({ name, company: company._id });

  return res.status(201).json({ success: true, nonTaxablePay });
});

// @ROUTE PUT /api/v1/nonTaxablePays/:id
// @Desc Update a non taxable Pay by its id for a specific company
// access PRIVATE - Logged in user
const updateNonTaxablePay = asyncHandler(async (req, res, next) => {
  const company = await Company.findById(req.company._id);
  const user = await User.findById(req.user._id);

  if (
    user.role !== 'admin' &&
    (!company || !user || company.user.toString() !== user._id.toString())
  ) {
    res.status(401);
    return next(new ErrorResponse({ message: 'Not authorized, access denied' }));
  }

  let nonTaxablePay = await NonTaxablePay.findOne({ company: company._id, _id: req.params.id });

  if (!nonTaxablePay) {
    res.status(404);
    return next(
      new ErrorResponse({ message: `Resource with an id of ${req.params.id} not found` }),
    );
  }

  const { name } = req.body;

  nonTaxablePay = await NonTaxablePay.findByIdAndUpdate(
    req.params.id,
    { name },
    { new: true, runValidators: true },
  );

  return res.status(200).json({ success: true, nonTaxablePay });
});

// @ROUTE DELETE /api/v1/taxablePays/:id
// @Desc Delte a taxablePay by its id for a specific company
// access PRIVATE - Logged in user
const deleteNonTaxablePay = asyncHandler(async (req, res, next) => {
  const company = await Company.findById(req.company._id);
  const user = await User.findById(req.user._id);

  if (
    user.role !== 'admin' &&
    (!company || !user || company.user.toString() !== user._id.toString())
  ) {
    res.status(401);
    return next(new ErrorResponse({ message: 'Not authorized, access denied' }));
  }

  const nonTaxablePay = await NonTaxablePay.findOne({ company: company._id, _id: req.params.id });

  if (!nonTaxablePay) {
    res.status(404);
    return next(
      new ErrorResponse({ message: `Resource with an id of ${req.params.id} not found` }),
    );
  }

  await NonTaxablePay.findByIdAndDelete(req.params.id);

  return res.status(200).json({
    success: true,
    nonTaxablePay: {},
    message: `Non Taxable pay - ID:${req.params.id} successfully deleted`,
  });
});

module.exports = {
  getNonTaxablePays,
  getNonTaxablePay,
  createNonTaxablePay,
  updateNonTaxablePay,
  deleteNonTaxablePay,
};
