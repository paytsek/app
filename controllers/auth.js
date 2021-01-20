const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

const User = require('../models/User');

// @ROUTE POST /api/v1/auth/register
// @Desc Register a user
// access PUBLIC
const registerUser = asyncHandler(async (req, res, next) => {
  const { username, email, password, firstName, lastName } = req.body;

  let user = new User({ username, email, password, firstName, lastName });

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
      new ErrorResponse({ message: 'Please provide an email and password' }),
    );
  }

  const user = await User.findOne({ email }).select('+password');

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

// @ROUTE GET /api/v1/auth/
// @Desc Get auth user
// access PRIVATE
const getAuthUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    return next(new ErrorResponse({ message: 'No user, access denied' }));
  }

  res.json({
    success: true,
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: user.fullName,
    },
  });
});

module.exports = {
  registerUser,
  loginUser,
  getAuthUser,
};
