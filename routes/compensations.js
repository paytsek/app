const express = require('express');

const {
  getCompensations,
  getCompensation,
  createCompensation,
  updateCompensation,
} = require('../controllers/compensations');

const administrator = require('../middleware/administrator');
const auth = require('../middleware/auth');
const tenant = require('../middleware/tenant');

const router = express.Router({ mergeParams: true });

// api/v1/employees/:employeeId/compensations
router
  .route('/')
  .get(auth, tenant, administrator, getCompensations)
  .post(auth, tenant, administrator, createCompensation);

// api/v1/employees/:employeeId/compensations/:id
router
  .route('/:id')
  .get(auth, tenant, administrator, getCompensation)
  .put(auth, tenant, administrator, updateCompensation);

module.exports = router;
