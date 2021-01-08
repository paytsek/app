const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/User');

// @ROUTE GET /api/v1/users/
// @Desc GEt all users
// access PRIVATE - Admin Users
const getUsers = asyncHandler(async (req, res, next) => {
	const users = await User.find({}).populate('company');

	res.status(200).json({ success: true, users, count: users.length });
});

module.exports = {
	getUsers,
};
