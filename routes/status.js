const express = require('express');

const router = express.Router({ mergeParams: true });

const { getStatuses } = require('../controllers/status');

const administrator = require('../middleware/administrator');
const auth = require('../middleware/auth');
const tenant = require('../middleware/tenant');

router.route('/').get(auth, tenant, administrator, getStatuses);

module.exports = router;
