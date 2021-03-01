const mongoose = require('mongoose');

const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const Compensation = require('../models/Compensation');
const Company = require('../models/Company');
const User = require('../models/User');
const Employee = require('../models/Employee');
const OtherTaxablePay = require('../models/OtherTaxablePay');
const OtherNonTaxablePay = require('../models/OtherNonTaxablePay');

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

  const compensations = await Compensation.find({ employee: employee._id })
    .populate({
      path: 'otherTaxablePays',
      populate: {
        path: 'taxablePay',
      },
    })
    .populate({
      path: 'otherNonTaxablePays',
      populate: {
        path: 'nonTaxablePay',
      },
    });

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
  })
    .populate('otherTaxablePays')
    .populate('otherNonTaxablePays');

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
  const { basicPay, effectivityDate, deminimis } = req.body;

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

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const opts = { session };

    let [compensation] = await Compensation.create(
      [
        {
          basicPay,
          deminimis,
          effectivityDate,
          employee: employee._id,
          company: company._id,
        },
      ],
      opts,
    );

    const { otherTaxablePays, otherNonTaxablePays } = req.body;

    if (!otherTaxablePays || !otherNonTaxablePays) {
      const errors = {};
      errors.otherTaxablePays = !otherTaxablePays
        ? 'Other Taxable Pays is required'
        : undefined;
      errors.otherNonTaxablePays = !otherNonTaxablePays
        ? 'Other Non Taxable Pays is required'
        : undefined;
      await session.abortTransaction();
      session.endSession();
      res.status(400);
      return next(new ErrorResponse(errors));
    }
    await OtherTaxablePay.create(
      otherTaxablePays.map((otherTaxablePay) => ({
        ...otherTaxablePay,
        employee: employee._id,
        compensation: compensation._id,
      })),
      opts,
    );
    await OtherNonTaxablePay.create(
      otherNonTaxablePays.map((otherNonTaxablePay) => ({
        ...otherNonTaxablePay,
        employee: employee._id,
        compensation: compensation._id,
      })),
      opts,
    );

    await session.commitTransaction();
    session.endSession();

    compensation = await Compensation.findById(compensation._id)
      .populate({
        path: 'otherTaxablePays',
        populate: {
          path: 'taxablePay',
        },
      })
      .populate({
        path: 'otherNonTaxablePays',
        populate: {
          path: 'nonTaxablePay',
        },
      });

    return res.status(201).json({ success: true, compensation });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
});

// @ROUTE PUT /api/v1/employees/:employeeId/compensations/:id
// @Desc Create compensation of an specific employee
// @access PRIVATE - Logged in user
const updateCompensation = asyncHandler(async (req, res, next) => {
  const { basicPay, effectivityDate, otherTaxablePays, otherNonTaxablePays } = req.body;

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

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const opts = { session };

    let compensation = await Compensation.findOne({
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

    compensation.basicPay = basicPay;
    compensation.effectivityDate = effectivityDate;

    if (otherTaxablePays && otherTaxablePays.length > 0) {
      otherTaxablePays.forEach(async (otherTaxablePay) => {
        await OtherTaxablePay.findOneAndUpdate(
          { _id: otherTaxablePay.id },
          {
            value: otherTaxablePay.value,
          },
          { new: true, runValidators: true },
        );
      });
    }

    if (otherNonTaxablePays && otherNonTaxablePays.length > 0) {
      otherNonTaxablePays.forEach(async (otherNonTaxablePay) => {
        await OtherNonTaxablePay.findByIdAndUpdate(
          otherNonTaxablePay.id,
          {
            value: otherNonTaxablePay.value,
          },
          { new: true, runValidators: true },
        );
      });
    }

    compensation = await compensation.save(opts);

    await session.commitTransaction();
    session.endSession();

    const updatedCompensation = await Compensation.findById(compensation._id)
      .populate('otherTaxablePays')
      .populate('otherNonTaxablePays');

    return res.status(200).json({ success: true, compensation: updatedCompensation });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
});

// @ROUTE DELETE /api/v1/employees/:employeeId/compensations/:id
// @Desc Delete status of an specific employee
// @access PRIVATE - Logged in user
const deleteCompensation = asyncHandler(async (req, res, next) => {
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

  await compensation.remove();

  return res.status(200).json({
    success: true,
    compensation: {},
    message: `Compensation - ID:${req.params.id} successfully deleted`,
  });
});

module.exports = {
  getCompensations,
  getCompensation,
  createCompensation,
  updateCompensation,
  deleteCompensation,
};
