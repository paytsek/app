const mongoose = require('mongoose');

const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

// @ROUTE GET /api/v1/:companySlug/payruns
// @Desc Get a payruns for a specific company
// access PRIVATE - Logged in user
const getPayruns = asyncHandler(async (req, res, next) => {
  console.log(req.user);
  console.log(req.company);
});

module.exports = {
  getPayruns,
};
