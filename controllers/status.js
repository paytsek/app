const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const Status = require('../models/Status');
const Company = require('../models/Company');
const User = require('../models/User');
const Employee = require('../models/Employee');

// @ROUTE GET /api/v1/employees/:employeeId/status
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

// @ROUTE GET /api/v1/employees/:employeeId/status/:id
// @Desc Get status of an specific employee
// @access PRIVATE - Logged in user
const getStatus = asyncHandler(async (req, res, next) => {
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

  const status = await Status.findOne({ employee: employee._id, _id: req.params.id });

  if (!status) {
    res.status(404);
    return next(
      new ErrorResponse({
        message: `Resource with an id of ${req.params.id} not found`,
      }),
    );
  }

  return res.status(200).json({ success: true, status });
});

// @ROUTE POST /api/v1/employees/:employeeId/status
// @Desc Create status of an specific employee
// @access PRIVATE - Logged in user
const createStatus = asyncHandler(async (req, res, next) => {
  const { effectivityDate, active } = req.body;

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

  const status = await Status.create({
    active,
    effectivityDate,
    employee: employee._id,
    company: company._id,
  });

  return res.status(201).json({ success: true, status });
});

// @ROUTE PUT /api/v1/employees/:employeeId/status/:id
// @Desc Create status of an specific employee
// @access PRIVATE - Logged in user
const updateStatus = asyncHandler(async (req, res, next) => {
  const { active, effectivityDate } = req.body;

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

  const status = await Status.findOne({ employee: employee._id, _id: req.params.id });

  if (!status) {
    res.status(404);
    return next(
      new ErrorResponse({
        message: `Resource with an id of ${req.params.id} not found`,
      }),
    );
  }

  status.active = active;
  status.effectivityDate = effectivityDate;

  const updatedStatus = await status.save();

  return res.status(200).json({ success: true, status: updatedStatus });
});

// @ROUTE DELETE /api/v1/employees/:employeeId/status/:id
// @Desc Delete status of an specific employee
// @access PRIVATE - Logged in user
const deleteStatus = asyncHandler(async (req, res, next) => {
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

  const status = await Status.findOne({ employee: employee._id, _id: req.params.id });

  if (!status) {
    res.status(404);
    return next(
      new ErrorResponse({
        message: `Resource with an id of ${req.params.id} not found`,
      }),
    );
  }

  await status.remove();

  return res.status(200).json({
    success: true,
    status: {},
    message: `Status - ID:${req.params.id} successfully deleted`,
  });
});

module.exports = {
  getStatuses,
  getStatus,
  createStatus,
  updateStatus,
  deleteStatus,
};
