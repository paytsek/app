const Department = require('../models/Department');
const Company = require('../models/Company');
const User = require('../models/User');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

// @ROUTE GET /api/v1/departments
// @Desc Get all departments of the company settings
// access PRIVATE - Logged in user
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

// @ROUTE PUT /api/v1/departments/:id
// @Desc Update a department by id
// access PRIVATE - Logged in user
const updateDepartment = asyncHandler(async (req, res, next) => {
  const company = await Company.findById(req.company._id).populate({
    path: 'companySettings',
    populate: {
      path: 'departments',
    },
  });

  const user = await User.findById(req.user._id);

  if (!company || !user || company.user.toString() !== user._id.toString()) {
    res.status(401);
    return next(new ErrorResponse({ message: 'Not authorized, access denied' }));
  }

  if (!company.companySettings) {
    res.status(401);
    return next(new ErrorResponse({ message: 'No Company settings, access denied' }));
  }

  const departmentExistInCompany = company.companySettings.departments.find(
    (department) => department._id.toString() === req.params.id,
  );

  if (!departmentExistInCompany) {
    res.status(404);
    return next(
      new ErrorResponse({ message: `Resource with an id of ${req.params.id} not found` }),
    );
  }

  const { name } = req.body;

  const department = await Department.findByIdAndUpdate(
    req.params.id,
    { name },
    {
      new: true,
      runValidators: true,
    },
  );

  return res
    .status(200)
    .json({ success: true, department, message: 'Department successfully updated' });
});

// @ROUTE DELETE /api/v1/departments/:id
// @Desc Delete a department by id
// access PRIVATE - Logged in user
const deleteDepartment = asyncHandler(async (req, res, next) => {
  const company = await Company.findById(req.company._id).populate({
    path: 'companySettings',
    select: 'departments',
    populate: {
      path: 'departments',
    },
  });
  const user = await User.findById(req.user._id);

  if (!company || !user || company.user.toString() !== user._id.toString()) {
    res.status(401);
    return next(new ErrorResponse({ message: 'Not authorized, access denied' }));
  }

  if (!company.companySettings) {
    res.status(401);
    return next(new ErrorResponse({ message: 'No Company settings, access denied' }));
  }

  const departmentExistInCompany = company.companySettings.departments.find(
    (department) => department._id.toString() === req.params.id,
  );

  if (!departmentExistInCompany) {
    res.status(404);
    return next(
      new ErrorResponse({ message: `Resource with an id of ${req.params.id} not found` }),
    );
  }

  await Department.findByIdAndDelete(req.params.id);

  return res.status(200).json({
    success: true,
    department: {},
    message: `Department - ID:${req.params.id} successfully deleted`,
  });
});

module.exports = {
  getDepartments,
  updateDepartment,
  deleteDepartment,
};
