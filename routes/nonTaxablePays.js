const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');
const tenant = require('../middleware/tenant');
const administrator = require('../middleware/administrator');
const {
  getNonTaxablePays,
  getNonTaxablePay,
  createNonTaxablePay,
  updateNonTaxablePay,
  deleteNonTaxablePay,
} = require('../controllers/nonTaxablePays');

// api/v1/nonTaxablePays
router
  .route('/')
  .get(auth, tenant, administrator, getNonTaxablePays)
  .post(auth, tenant, administrator, createNonTaxablePay);

// api/v1/nonTaxablePays/:id
router
  .route('/:id')
  .get(auth, tenant, administrator, getNonTaxablePay)
  .put(auth, tenant, administrator, updateNonTaxablePay)
  .delete(auth, tenant, administrator, deleteNonTaxablePay);

module.exports = router;
