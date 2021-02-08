const express = require('express');

const router = express.Router();
const { getDepartments } = require('../controllers/departments');
const tenant = require('../middleware/tenant');
const auth = require('../middleware/auth');

router.route('/').get(auth, tenant, getDepartments);

module.exports = router;
