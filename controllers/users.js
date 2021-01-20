const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const CompanySetting = require('../models/CompanySetting');

// @ROUTE GET /api/v1/users/
// @Desc GEt all users
// @access PRIVATE - Logged in user
const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({}).populate('company');

  res.status(200).json({ success: true, users, count: users.length });
});

// @ROUTE GET /api/v1/users/:id
// @DESC Get a user by id
// @access PRIVATE - Logged in user
const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    return next(
      new ErrorResponse({
        message: `Resource with an id of ${req.params.id} not found`,
      }),
    );
  }

  res.status(200).json({ success: true, user });
});

// @ROUTE GET /api/v1/users/current-user
// @DESC Get current user information
// @access PRIVATE - Logged in user
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
// @access PRIVATE - Logged in user
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
    },
  );

  res.status(200).json({ success: true, user });
});

// @ROUTE PUT /api/v1/users/current-user/password
// @DESC Change Password of current user information
// @access PRIVATE - Logged in user
const updateCurrentUserPassword = asyncHandler(async (req, res, next) => {
  const { currentPassword, confirmPassword, newPassword } = req.body;

  const currentUser = await User.findById(req.user._id).select('+password');

  if ((!currentPassword || !confirmPassword, !newPassword)) {
    res.status(400);
    return next(new ErrorResponse({ message: 'Please fill all fields' }));
  }

  if (newPassword !== confirmPassword) {
    res.status(400);
    return next(
      new ErrorResponse({
        message: 'New password and confirmation password mismatch',
      }),
    );
  }

  const isMatch = await currentUser.isMatch(currentPassword);

  if (!isMatch) {
    res.status(400);
    return next(new ErrorResponse({ password: 'Invalid password' }));
  }

  currentUser.password = newPassword;

  const user = await currentUser.save();

  res.status(200).json({ success: true, user });
});

// @ROUTE DELETE /api/v1/users/current-user/
// @DESC Delete current user
// @access PRIVATE - Logged in user
const deleteCurrentUser = asyncHandler(async (req, res, next) => {
  const { password, confirmPassword } = req.body;

  const user = await User.findOne({ _id: req.user._id })
    .populate({
      path: 'companies',
      populate: {
        path: 'companySettings',
        model: 'CompanySetting',
      },
    })
    .select('+password');

  if (!password) {
    res.status(400);
    return next(new ErrorResponse({ message: 'Please enter your password' }));
  }

  if (password !== confirmPassword) {
    res.status(400);
    return next(
      new ErrorResponse({
        message: 'Entered Password and password confirmation mismatch',
      }),
    );
  }

  const isMatch = await user.isMatch(password);

  if (!isMatch) {
    res.status(401);
    return next(new ErrorResponse({ message: 'Invalid password' }));
  }

  const companySettings = user.companies.map(
    company => company.companySettings._id,
  );

  await CompanySetting.deleteMany({ _id: { $in: companySettings } });

  await user.remove();

  res
    .status(200)
    .json({ success: true, user: {}, message: 'User successfully deleted' });
});

// @ROUTE PUT /api/v1/users/:id
// @DESC Update user by its Id
// @access PRIVATE - Logged in user and Admin
const updateUser = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findById(req.params.id);

  user.email = email;

  const updateduser = await user.save();

  res.status(200).json({
    success: true,
    user: updateduser,
    message: 'Successfully updated',
  });
});

module.exports = {
  getUsers,
  getUser,
  getCurrentUser,
  updateCurrentUser,
  updateCurrentUserPassword,
  deleteCurrentUser,
  updateUser,
};
