const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

const User = require('../models/User');

// @ROUTE POST /api/v1/auth
// @Desc Register a user
// access PUBLIC
const registerUser = asyncHandler(async (req, res, next) => {
	const { username, email, password } = req.body;

	let user = new User({ username, email, password });

	user = await user.save();

	const token = user.generateJwtToken();

	res.status(201).json({
		success: true,
		token,
	});
});

module.exports = {
	registerUser,
};
