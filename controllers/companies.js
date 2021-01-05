const Company = require('../models/Company');

const asyncHandler = require('../middleware/asyncHandler');

exports.createCompany = asyncHandler(async (req, res, next) => {
	const { name } = req.body;

	const newCompany = new Company({ name });

	const company = await newCompany.save();
	res.status(201).json({ success: true, company });
});
