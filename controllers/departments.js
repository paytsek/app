const Department = require('../models/Department');
const Company = require('../models/Company');
const User = require('../models/User');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

const getDepartments = asyncHandler(async (req, res, next) => {
  const company = await Company.findById(req.company._id);
  const user = await User.findById(req.user._id);

  if (!company || !user || company.user.toString() !== user._id.toString()) {
    res.status(401);
    return next(new ErrorResponse({ message: 'Not authorized, access denied' }));
  }

  const departments = await Department.find({ company: company._id });

  return res.status(200).json({ success: true, departments });
});

module.exports = {
  getDepartments,
};
