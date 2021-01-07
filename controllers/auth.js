const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

// @ROUTE POST /api/v1/auth
// @Desc Register a user
// access PUBLIC -
const registerUser = asyncHandler(async (req, res, next) => {
	res.send('Registeruser');
});

module.exports = {
	registerUser,
};
