const express = require('express');

const router = express.Router();
const {
  getDepartments,
  updateDepartment,
  deleteDepartment,
  createDepartment,
} = require('../controllers/departments');
const tenant = require('../middleware/tenant');
const auth = require('../middleware/auth');

// api/v1/departments
router.route('/').get(auth, tenant, getDepartments).post(auth, tenant, createDepartment);
// api/v1/departments/:id
router.route('/:id').put(auth, tenant, updateDepartment).delete(auth, tenant, deleteDepartment);

module.exports = router;
