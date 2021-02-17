const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');
const tenant = require('../middleware/tenant');
const administrator = require('../middleware/administrator');
const { getTaxablePays, getTaxablePay } = require('../controllers/taxablePays');

// api/v1/taxablePays
router.route('/').get(auth, tenant, administrator, getTaxablePays);

// api/v1/taxablePays/:id
router.route('/:id').get(auth, tenant, administrator, getTaxablePay);

module.exports = router;
