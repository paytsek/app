const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const TaxablePay = require('../models/TaxablePay');
const Company = require('../models/Company');
const User = require('../models/User');

// @ROUTE GET /api/v1/taxablePays/
// @Desc Get taxablePays for a specific company
// access PRIVATE - Logged in user
const getTaxablePays = asyncHandler(async (req, res, next) => {
  const company = await Company.findById(req.company._id);
  const user = await User.findById(req.user._id);

  if (
    user.role !== 'admin' &&
    (!company || !user || company.user.toString() !== user._id.toString())
  ) {
    res.status(401);
    return next(new ErrorResponse({ message: 'Not authorized, access denied' }));
  }

  const taxablePays = await TaxablePay.find({ company: company._id });

  return res.status(200).json({ success: true, taxablePays });
});

// @ROUTE GET /api/v1/taxablePays/:id
// @Desc Get single taxablePay for a specific company
// access PRIVATE - Logged in user
const getTaxablePay = asyncHandler(async (req, res, next) => {
  const company = await Company.findById(req.company._id);
  const user = await User.findById(req.user._id);

  if (
    user.role !== 'admin' &&
    (!company || !user || company.user.toString() !== user._id.toString())
  ) {
    res.status(401);
    return next(new ErrorResponse({ message: 'Not authorized, access denied' }));
  }

  const taxablePay = await TaxablePay.findOne({
    company: company._id,
    _id: req.params.id,
  });

  if (!taxablePay) {
    res.status(404);
    return next(
      new ErrorResponse({ message: `Resource with an id of ${req.params.id} not found` }),
    );
  }

  return res.status(200).json({ success: true, taxablePay });
});

// @ROUTE POST /api/v1/taxablePays
// @Desc Create a taxablePay for a specific company
// access PRIVATE - Logged in user
const createTaxablePay = asyncHandler(async (req, res, next) => {
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

  const taxablePay = await TaxablePay.create({ name, company: company._id });

  return res.status(201).json({ success: true, taxablePay });
});

// @ROUTE PUT /api/v1/taxablePays/:id
// @Desc Update a taxablePay by its id for a specific company
// access PRIVATE - Logged in user
const updateTaxablePay = asyncHandler(async (req, res, next) => {
  const company = await Company.findById(req.company._id);
  const user = await User.findById(req.user._id);

  if (
    user.role !== 'admin' &&
    (!company || !user || company.user.toString() !== user._id.toString())
  ) {
    res.status(401);
    return next(new ErrorResponse({ message: 'Not authorized, access denied' }));
  }

  let taxablePay = await TaxablePay.findOne({ company: company._id, _id: req.params.id });

  if (!taxablePay) {
    res.status(404);
    return next(
      new ErrorResponse({ message: `Resource with an id of ${req.params.id} not found` }),
    );
  }

  const { name } = req.body;

  taxablePay = await TaxablePay.findByIdAndUpdate(
    req.params.id,
    { name },
    { new: true, runValidators: true },
  );

  return res.status(200).json({ success: true, taxablePay });
});

// @ROUTE DELETE /api/v1/taxablePays/:id
// @Desc Delte a taxablePay by its id for a specific company
// access PRIVATE - Logged in user
const deleteTaxablePay = asyncHandler(async (req, res, next) => {
  const company = await Company.findById(req.company._id);
  const user = await User.findById(req.user._id);

  if (
    user.role !== 'admin' &&
    (!company || !user || company.user.toString() !== user._id.toString())
  ) {
    res.status(401);
    return next(new ErrorResponse({ message: 'Not authorized, access denied' }));
  }

  const taxablePay = await TaxablePay.findOne({
    company: company._id,
    _id: req.params.id,
  });

  if (!taxablePay) {
    res.status(404);
    return next(
      new ErrorResponse({ message: `Resource with an id of ${req.params.id} not found` }),
    );
  }

  await taxablePay.remove();

  return res.status(200).json({
    success: true,
    taxablePay: {},
    message: `Taxable pay - ID:${req.params.id} successfully deleted`,
  });
});

module.exports = {
  getTaxablePays,
  getTaxablePay,
  createTaxablePay,
  updateTaxablePay,
  deleteTaxablePay,
};
