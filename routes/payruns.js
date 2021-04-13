const express = require('express');

const router = express.Router();

const administrator = require('../middleware/administrator');
const auth = require('../middleware/auth');
const tenant = require('../middleware/tenant');
const {
  getPayruns,
  getPayrun,
  createPayrun,
  updatePayrun,
  deletePayrun,
  updatePayrunStatus,
} = require('../controllers/payruns');

// api/v1/payruns
router
  .route('/')
  .get(auth, tenant, administrator, getPayruns)
  .post(auth, tenant, administrator, createPayrun);

// api/v1/payruns/:id
router
  .route('/:id')
  .get(auth, tenant, administrator, getPayrun)
  .put(auth, tenant, administrator, updatePayrun)
  .delete(auth, tenant, administrator, deletePayrun);

// api/v1/payruns/:id/status
router.route('/:id/status').put(auth, tenant, administrator, updatePayrunStatus);

module.exports = router;
