const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');
const tenant = require('../middleware/tenant');
const administrator = require('../middleware/administrator');
const {
  getTaxablePays,
  getTaxablePay,
  createTaxablePay,
  updateTaxablePay,
} = require('../controllers/taxablePays');

// api/v1/taxablePays
router
  .route('/')
  .get(auth, tenant, administrator, getTaxablePays)
  .post(auth, tenant, administrator, createTaxablePay);

// api/v1/taxablePays/:id
router
  .route('/:id')
  .get(auth, tenant, administrator, getTaxablePay)
  .put(auth, tenant, administrator, updateTaxablePay);

module.exports = router;
