const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const Status = require('../models/Status');
const Company = require('../models/Company');
const User = require('../models/User');
const Employee = require('../models/Employee');

// @ROUTE GET /api/v1/status/
// @Desc Get all status of an specific employee
// @access PRIVATE - Logged in user
const getStatuses = asyncHandler(async (req, res, next) => {
  const company = await Company.findById(req.company._id);
  const user = await User.findById(req.user._id);

  if (
    user.role !== 'admin' &&
    (!company || !user || company.user.toString() !== user._id.toString())
  ) {
    res.status(401);
    return next(new ErrorResponse({ message: 'Not authorized, access denied' }));
  }

  const employee = await Employee.findOne({
    _id: req.params.employeeId,
    company: company._id,
  });

  if (!employee) {
    res.status(404);
    return next(
      new ErrorResponse({
        message: `Resource with an id of ${req.params.employeeId} not found`,
      }),
    );
  }

  const statuses = await Status.find({ employee: req.params.employeeId });

  return res.status(200).json({ success: true, statuses });
});

module.exports = {
  getStatuses,
};
