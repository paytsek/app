const asyncHandler = require('../middleware/asyncHandler');

exports.createCompany = asyncHandler(async (req, res, next) => {
	res.send('Create Company Name');
});
