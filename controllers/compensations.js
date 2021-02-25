const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const Compensation = require('../models/Compensation');
const Company = require('../models/Company');
const User = require('../models/User');
const Employee = require('../models/Employee');

// @ROUTE GET /api/v1/employees/:employeeId/compensations
// @Desc Get all compensations of an specific employee
// @access PRIVATE - Logged in user
const getCompensations = asyncHandler(async (req, res, next) => {
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

  const compensations = await Compensation.find({ employee: employee._id });

  return res.status(200).json({ success: true, compensations });
});

// @ROUTE GET /api/v1/employees/:employeeId/compensations
// @Desc Get compensation of an specific employee
// @access PRIVATE - Logged in user
const getCompensation = asyncHandler(async (req, res, next) => {
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

  const compensation = await Compensation.findOne({
    employee: employee._id,
    _id: req.params.id,
  });

  if (!compensation) {
    res.status(404);
    return next(
      new ErrorResponse({
        message: `Resource with an id of ${req.params.id} not found`,
      }),
    );
  }

  return res.status(200).json({ success: true, compensation });
});

// @ROUTE POST /api/v1/employees/:employeeId/compensations
// @Desc Create compensation of an specific employee
// @access PRIVATE - Logged in user
const createCompensation = asyncHandler(async (req, res, next) => {
  const { basicPay, effectivityDate } = req.body;

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

  const compensation = await Compensation.create({
    basicPay,
    effectivityDate,
    employee: employee._id,
    company: company._id,
  });

  return res.status(201).json({ success: true, compensation });
});

module.exports = {
  getCompensations,
  getCompensation,
  createCompensation,
};
