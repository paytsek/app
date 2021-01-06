const Company = require('../models/Company');
const CompanySetting = require('../models/CompanySetting');

const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

// @ROUTE POST /api/v1/companies/name
// @Desc Create a company name
// access PRIVATE - Admin Users
const createCompany = asyncHandler(async (req, res, next) => {
	const { name } = req.body;

	const newCompany = new Company({ name });

	const company = await newCompany.save();
	res.status(201).json({ success: true, company });
});

// @ROUTE GET /api/v1/companies/
// @Desc Get all companies
// access PRIVATE - Admin Users
const getCompanies = asyncHandler(async (req, res, next) => {
	const companies = await Company.find({});

	res.status(200).json({ success: true, companies });
});

// @ROUTE GET /api/v1/companies/:id
// @Desc Get all companies
// access PRIVATE - Admin Users
const getCompany = asyncHandler(async (req, res, next) => {
	const { id } = req.params;

	const company = await Company.findById(id);

	if (!company) {
		res.status(404);
		throw new ErrorResponse({ message: `Resource with an of ${id} not found` });
	}

	res.status(200).json({ success: true, company });
});

// @ROUTE POST /api/v1/companies/:id/settings
// @Desc Create a company settings
// access PRIVATE - Admin Users
const createCompanySettings = asyncHandler(async (req, res, next) => {
	const companySettings = await CompanySetting.create({
		company: req.params.id,
		...req.body,
	});
	res.status(201).json({ success: true, companySettings });
});

module.exports = {
	createCompany,
	getCompanies,
	getCompany,
	createCompanySettings,
};
