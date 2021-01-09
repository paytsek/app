const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

// @ROUTE GET /api/v1/users/
// @Desc GEt all users
// @access PRIVATE
const getUsers = asyncHandler(async (req, res, next) => {
	const users = await User.find({}).populate('company');

	res.status(200).json({ success: true, users, count: users.length });
});

// @ROUTE GET /api/v1/users/:id
// @DESC Get a user by id
// @access PRIVATE
const getUser = asyncHandler(async (req, res, next) => {
	const user = await User.findById(req.params.id);

	if (!user) {
		res.status(404);
		return next(
			new ErrorResponse({
				message: `Resource with an id of ${req.params.id} not found`,
			})
		);
	}

	res.status(200).json({ success: true, user });
});

// @ROUTE GET /api/v1/users/current-user
// @DESC Get current user information
// @access PRIVATE
const getCurrentUser = asyncHandler(async (req, res, next) => {
	const user = req.user;

	if (!user) {
		res.status(404);
		return next(new ErrorResponse({ messge: 'User not found' }));
	}

	res.status(200).json({ success: true, user });
});

// @ROUTE PUT /api/v1/users/current-user
// @DESC Get current user information
// @access PRIVATE
const updateCurrentUser = asyncHandler(async (req, res, next) => {
	const { firstName, lastName, email, username } = req.body;

	const user = await User.findByIdAndUpdate(
		req.user._id,
		{
			firstName,
			lastName,
			email,
			username,
		},
		{
			new: true,
			runValidators: true,
			context: 'query',
		}
	);

	res.status(200).json({ success: true, user });
});

module.exports = {
	getUsers,
	getUser,
	getCurrentUser,
	updateCurrentUser,
};
