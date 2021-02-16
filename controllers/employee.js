const mongoose = require('mongoose');

const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

const Company = require('../models/Company');
const User = require('../models/User');
const Employee = require('../models/Employee');
const Status = require('../models/Status');
const Compensation = require('../models/Compensation');

// @ROUTE GET /api/v1/employees
// @Desc Get a employees for a specific company
// access PRIVATE - Logged in user
const getEmployees = asyncHandler(async (req, res, next) => {
  const company = await Company.findById(req.company._id);
  const user = await User.findById(req.user._id);

  if (
    user.role !== 'admin' &&
    (!company || !user || company.user.toString() !== user._id.toString())
  ) {
    res.status(401);
    return next(new ErrorResponse({ message: 'Not authorized, access denied' }));
  }

  const employees = await Employee.find({ company: company._id }).populate('department', 'name');

  return res.status(200).json({ success: true, employees });
});

// @ROUTE GET /api/v1/employees/:id
// @Desc Get single employee for a specific company
// access PRIVATE - Logged in user
const getEmployee = asyncHandler(async (req, res, next) => {
  const company = await Company.findById(req.company._id);
  const user = await User.findById(req.user._id);

  if (
    user.role !== 'admin' &&
    (!company || !user || company.user.toString() !== user._id.toString())
  ) {
    res.status(401);
    return next(new ErrorResponse({ message: 'Not authorized, access denied' }));
  }

  const employee = await Employee.findOne({ _id: req.params.id, company: company._id })
    .populate('department', 'name')
    .populate({ path: 'statuses' })
    .populate({ path: 'compensations' });

  if (!employee) {
    res.status(404);
    return next(
      new ErrorResponse({ message: `Resource with an id of ${req.params.id} not found` }),
    );
  }

  return res.status(200).json({ success: true, employee });
});

// @ROUTE POST /api/v1/employees
// @Desc Createa an employee
// access PRIVATE - Logged in user
const createEmployee = asyncHandler(async (req, res, next) => {
  const company = await Company.findById(req.company._id);
  const user = await User.findById(req.user._id);

  if (
    user.role !== 'admin' &&
    (!company || !user || company.user.toString() !== user._id.toString())
  ) {
    res.status(401);
    return next(new ErrorResponse({ message: 'Not authorized, access denied' }));
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const opts = { session };
    const [employee] = await Employee.create([{ ...req.body, company: company._id }], opts);

    let { status } = req.body;
    let { compensation } = req.body;

    if (!status || !compensation) {
      const errors = {};
      errors.status = !status ? 'Status is required' : undefined;
      errors.compensation = !compensation ? 'Compensation is required' : undefined;
      await session.abortTransaction();
      session.endSession();
      res.status(400);
      return next(new ErrorResponse(errors));
    }

    const { active, effectivityDate } = status;
    const { basicPay } = compensation;
    const dailyRate = Number(basicPay) / Number(employee.workingDays);
    const hourlyRate = Number(dailyRate) / Number(employee.workingHours);

    status = await Status.create(
      [{ active, effectivityDate, company: company._id, employee: employee._id }],
      opts,
    );

    compensation = await Compensation.create(
      [{ basicPay, dailyRate, hourlyRate, company: company._id, employee: employee._id }],
      opts,
    );

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({ success: true, employee });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
});

module.exports = {
  getEmployees,
  getEmployee,
  createEmployee,
};
