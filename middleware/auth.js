const jwt = require('jsonwebtoken');

const User = require('../models/User');
const asyncHandler = require('./asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

const auth = asyncHandler(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		token = req.headers.authorization.split(' ')[1];
	}

	if (!token) {
		res.status(401);
		return next(
			new ErrorResponse({ message: 'Not authorize to access this route' })
		);
  }
  
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decoded.id)

    next()
  } catch(error) {
    res.status(401)
    next(new ErrorResponse({ message: 'Not authorize to access this route' }))
  }
});

module.exports = auth;
