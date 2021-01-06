const Company = require('../models/Company');

const asyncHandler = require('../middleware/asyncHandler');

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
// access PUBLIC
const getCompanies = asyncHandler(async (req, res, next) => {
	const companies = await Company.find({});

	res.status(200).json({ success: true, companies });
});

module.exports = {
	createCompany,
	getCompanies,
};
