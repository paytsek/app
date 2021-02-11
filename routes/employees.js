const express = require('express');

const { getEmployee } = require('../controllers/employee');
const administrator = require('../middleware/administrator');
const auth = require('../middleware/auth');
const tenant = require('../middleware/tenant');

const router = express.Router();

router.route('/').get(auth, tenant, administrator, getEmployee);

module.exports = router;
