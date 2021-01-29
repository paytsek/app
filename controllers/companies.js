const Company = require('../models/Company');
const CompanySetting = require('../models/CompanySetting');

const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

// @ROUTE POST /api/v1/companies/name
// @Desc Create a company name
// access PRIVATE - Logged in user
const createCompany = asyncHandler(async (req, res, next) => {
  const { name } = req.body;

  if (!req.user || !req.user._id) {
    res.status(401);
    return next(new ErrorResponse({ message: 'User must exist' }));
  }

  const company = await Company.create({ name, user: req.user._id });

  return res.status(201).json({ success: true, company });
});

// @ROUTE GET /api/v1/companies/slug/:slug
// @Desc Get a company slug
// access PRIVATE - Logged in user
const getCompanySlug = asyncHandler(async (req, res, next) => {
  const company = await Company.findOne({ slug: req.params.slug }).select('slug user');

  if (!company) {
    res.status(401);
    return next(new ErrorResponse({ message: 'No Company, access denied' }));
  }

  if (req.user.role !== 'admin' && company.user.toString() !== req.user._id.toString()) {
    res.status(401);
    return next(new ErrorResponse({ message: 'Not authorize to access this route' }));
  }

  return res.status(200).json({ success: true, slug: company.slug });
});

// @ROUTE POST /api/v1/companies/slug/:slug
// @Desc SET a company slug
// access PRIVATE - Logged in user
const setCompanySlug = asyncHandler(async (req, res, next) => {
  const company = await Company.findOne({ slug: req.params.slug }).select('slug user');

  if (!company) {
    res.status(400);
    return next(
      new ErrorResponse({ message: `Resource with an id of ${req.params.slug} not found` }),
    );
  }

  if (req.user.role !== 'admin' && company.user.toString() !== req.user._id.toString()) {
    res.status(401);
    return next(new ErrorResponse({ message: 'Not authorize to access this route' }));
  }

  return res.status(200).json({ success: true, slug: company.slug });
});

// @ROUTE GET /api/v1/companies/
// @Desc Get all companies
// access PRIVATE - Logged in user
const getCompanies = asyncHandler(async (req, res) => {
  let companies = await Company.find({ user: req.user._id }).populate({
    path: 'companySettings',
  });

  if (req.user.role === 'admin') {
    companies = await Company.find({}).populate({
      path: 'companySettings',
    });

    return res.status(200).json({ success: true, companies });
  }

  return res.status(200).json({ success: true, companies });
});

// @ROUTE GET /api/v1/companies/:id
// @Desc Get all companies
// access PRIVATE - Logged in user
const getCompany = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const company = await Company.findById(id).populate({
    path: 'companySettings',
  });

  if (!company) {
    res.status(404);
    return next(new ErrorResponse({ message: `Resource with an of ${id} not found` }));
  }

  if (req.user.role !== 'admin' && req.user._id.toString() !== company.user.toString()) {
    res.status(401);
    return next(new ErrorResponse({ message: 'Not authorize to access this route' }));
  }

  return res.status(200).json({ success: true, company });
});

// @ROUTE POST /api/v1/companies/:id/settings
// @Desc Create a company settings
// access PRIVATE - Logged in user
const createCompanySettings = asyncHandler(async (req, res, next) => {
  const company = await Company.findById(req.company._id);

  if (!company) {
    res.status(404);
    return next(new ErrorResponse({ message: 'No company is selected' }));
  }

  if (company.user.toString() !== req.user._id.toString()) {
    res.status(401);
    return next(new ErrorResponse({ message: 'User is not authorized' }));
  }

  const companySettings = await CompanySetting.create({
    company: company._id,
    ...req.body,
  });

  return res.status(201).json({ success: true, companySettings });
});

// @ROUTE PUT /api/v1/companies/:id/settings/:companySettingsId
// @DESC Update a company settings
// @ACCESS PRIVATE - Logged in user
const updateCompanySettings = asyncHandler(async (req, res, next) => {
  const { companySettingsId, id } = req.params;

  const company = await Company.findById(id).populate({
    path: 'companySettings',
  });

  if (!company) {
    res.status(401);
    return next(new ErrorResponse({ message: 'Invalid Company id' }));
  }

  let { companySettings } = company;

  if (req.user.role !== 'admin' && req.user._id.toString() !== company.user.toString()) {
    res.status(401);
    return next(new ErrorResponse({ message: 'Not authorized to access this route' }));
  }

  if (!companySettings) {
    res.status(404);
    return next(
      new ErrorResponse({
        message: `Resource with an id of ${companySettingsId} not found`,
      }),
    );
  }

  if (id.toString() !== companySettings.company.toString()) {
    res.status(401);
    return next(new ErrorResponse({ message: 'Not authorized to access this route' }));
  }

  companySettings = await CompanySetting.findById(companySettingsId);

  const fields = Object.keys(req.body);
  fields.forEach(field => {
    companySettings[field] = req.body[field];
  });

  const updatedCompanySettings = await companySettings.save();

  return res.status(200).json({ success: true, companySettings: updatedCompanySettings });
});

// @ROUTE DELETE /api/v1/companies/:id/settings/:companySettingsId
// @DESC Delete a company settings
// @ACCESS PRIVATE - Logged in user
const deleteCompanySettings = asyncHandler(async (req, res, next) => {
  const { companySettingsId, id } = req.params;

  const company = await Company.findById(id).populate({
    path: 'companySettings',
  });

  if (!company) {
    res.status(401);
    return next(new ErrorResponse({ message: 'Invalid Company id' }));
  }

  const { companySettings } = company;

  if (req.user._id.toString() !== company.user.toString()) {
    res.status(401);
    return next(new ErrorResponse({ message: 'Not authorized to access this route' }));
  }

  if (!companySettings) {
    res.status(404);
    return next(
      new ErrorResponse({
        message: `Resource with an id of ${companySettingsId} not found`,
      }),
    );
  }

  if (id.toString() !== companySettings.company.toString()) {
    res.status(401);
    return next(new ErrorResponse({ message: 'Not authorized to access this route' }));
  }

  await CompanySetting.findByIdAndDelete(companySettings._id);

  return res.status(200).json({
    success: true,
    companySettings: {},
    message: `Company Settings - ID:${companySettings._id} successfully deleted`,
  });
});

// @ROUTE PUT /api/v1/companies/name/:id
// @DESC Update company name
// @ACCESS PRIVATE - Logged in user
const updateCompanyName = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const company = await Company.findOne({ _id: id });

  if (!company) {
    res.status(404);
    return next(
      new ErrorResponse({
        message: `Resource with an id of ${id} not found`,
      }),
    );
  }

  if (req.user.role !== 'admin' && req.user._id.toString() !== company.user.toString()) {
    res.status(401);
    return next(new ErrorResponse({ message: 'Not authorize to access this route' }));
  }

  company.name = name;

  await company.save();

  return res.status(200).json({ success: true, company });
});

// @ROUTE DELETE /api/v1/companies/name/:id
// @DESC Delete Company
// @ACCESS PRIVATE - Logged in user
const deleteCompany = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const company = await Company.findById(id);

  if (!company) {
    res.status(404);
    return next(new ErrorResponse({ message: `Resource with an id of ${id} not found` }));
  }

  if (req.user.role !== 'admin' && company.user.toString() !== req.user._id.toString()) {
    res.status(401);
    return next(new ErrorResponse({ message: 'Not authorized to access this route' }));
  }

  await company.remove();

  return res.status(200).json({
    success: true,
    company: {},
    message: `${company.name} - ID:${company._id} successfully deleted`,
  });
});

module.exports = {
  createCompany,
  getCompanies,
  getCompany,
  createCompanySettings,
  updateCompanyName,
  deleteCompany,
  updateCompanySettings,
  deleteCompanySettings,
  getCompanySlug,
  setCompanySlug,
};
