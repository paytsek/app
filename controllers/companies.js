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

	res.status(201).json({ success: true, company });
});

// @ROUTE GET /api/v1/companies/
// @Desc Get all companies
// access PRIVATE - Logged in user
const getCompanies = asyncHandler(async (req, res, next) => {
	const companies = await Company.find({});

	res.status(200).json({ success: true, companies });
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
		throw new ErrorResponse({ message: `Resource with an of ${id} not found` });
	}

	res.status(200).json({ success: true, company });
});

// @ROUTE POST /api/v1/companies/:id/settings
// @Desc Create a company settings
// access PRIVATE - Logged in user
const createCompanySettings = asyncHandler(async (req, res, next) => {
	const company = await Company.findById(req.params.id);

	if (!company) {
		res.status(404);
		throw new ErrorResponse({ message: 'No company is selected' });
	}

	if (company.user.toString() !== req.user._id.toString()) {
		res.status(401);
		return next(new ErrorResponse({ message: 'User is not authorized' }));
	}

	const companySettings = await CompanySetting.create({
		company: req.params.id,
		...req.body,
	});

	res.status(201).json({ success: true, companySettings });
});

// @ROUTE PUT /api/v1/companies/name/:id
// @DESC Update company name
// @ACCESS PRIVATE - Logged in user
const updateCompanyName = asyncHandler(async (req, res, next) => {
	const { id } = req.params;
	const { name } = req.body;

	let company = await Company.findOne({ _id: id });

	if (!company) {
		res.status(404);
		return next(
			new ErrorResponse({
				message: `Resource with an id of ${id} not found`,
			})
		);
	}

	if (req.user._id.toString() !== company.user.toString()) {
		res.status(401);
		return next(
			new ErrorResponse({ message: 'Not authorize to access this route' })
		);
	}

	company.name = name;

	await company.save();

	res.status(200).json({ success: true, company });
});

module.exports = {
	createCompany,
	getCompanies,
	getCompany,
	createCompanySettings,
	updateCompanyName,
};
