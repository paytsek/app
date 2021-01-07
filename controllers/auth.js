const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

const User = require('../models/User');

// @ROUTE POST /api/v1/auth/register
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

// @ROUTE POST /api/v1/auth/login
// @Desc Login a user
// access PUBLIC
const loginUser = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		res.status(400);
		return next(
			new ErrorResponse({ message: 'Please provide an email and password' })
		);
	}

	let user = await User.findOne({ email }).select('+password');

	if (!user) {
		res.status(401);
		return next(new ErrorResponse({ message: 'Invalid credentials' }));
	}

	const isMatch = await user.isMatch(password);

	if (!isMatch) {
		res.status(401);
		return next(new ErrorResponse({ message: 'Invalid credentials' }));
	}

	const token = user.generateJwtToken();

	res.status(200).json({
		success: true,
		token,
	});
});

module.exports = {
	registerUser,
	loginUser,
};
