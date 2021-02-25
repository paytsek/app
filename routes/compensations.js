const express = require('express');

const { getCompensations, getCompensation } = require('../controllers/compensations');

const administrator = require('../middleware/administrator');
const auth = require('../middleware/auth');
const tenant = require('../middleware/tenant');

const router = express.Router({ mergeParams: true });

// api/v1/employees/:employeeId/compensations
router.route('/').get(auth, tenant, administrator, getCompensations);

// api/v1/employees/:employeeId/compensations/:id
router.route('/:id').get(auth, tenant, administrator, getCompensation);

module.exports = router;
