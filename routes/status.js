const express = require('express');

const router = express.Router({ mergeParams: true });

const {
  getStatuses,
  getStatus,
  createStatus,
  updateStatus,
  deleteStatus,
} = require('../controllers/status');

const administrator = require('../middleware/administrator');
const auth = require('../middleware/auth');
const tenant = require('../middleware/tenant');

// api/v1/employees/:employeeId/status
router
  .route('/')
  .get(auth, tenant, administrator, getStatuses)
  .post(auth, tenant, administrator, createStatus);

// api/v1/employees/:employeeId/status/:id
router
  .route('/:id')
  .get(auth, tenant, administrator, getStatus)
  .put(auth, tenant, administrator, updateStatus)
  .delete(auth, tenant, administrator, deleteStatus);

module.exports = router;
