const express = require('express');

const router = express.Router();

const administrator = require('../middleware/administrator');
const auth = require('../middleware/auth');
const tenant = require('../middleware/tenant');
const { getPayruns } = require('../controllers/payruns');

// api/v1/payruns
router.route('/').get(auth, tenant, administrator, getPayruns);

module.exports = router;
