const express = require('express');

const router = express.Router({ mergeParams: true });

const { getStatuses, getStatus, createStatus } = require('../controllers/status');

const administrator = require('../middleware/administrator');
const auth = require('../middleware/auth');
const tenant = require('../middleware/tenant');

// api/v1/employees/:employeeId/status
router
  .route('/')
  .get(auth, tenant, administrator, getStatuses)
  .post(auth, tenant, administrator, createStatus);

// api/v1/employees/:employeeId/status/:id
router.route('/:id').get(auth, tenant, administrator, getStatus);

module.exports = router;
