const express = require('express');

const { getCompensations } = require('../controllers/compensations');

const administrator = require('../middleware/administrator');
const auth = require('../middleware/auth');
const tenant = require('../middleware/tenant');

const router = express.Router({ mergeParams: true });

// api/v1/employees/:employeeId/compensations
router.route('/').get(auth, tenant, administrator, getCompensations);

module.exports = router;
