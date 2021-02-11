const asyncHandler = require('../middleware/asyncHandler');

const getEmployee = asyncHandler(async (req, res) => {
  res.send('Get employee');
});

module.exports = {
  getEmployee,
};
