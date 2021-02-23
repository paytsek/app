const express = require('express');

const {
  getEmployees,
  getEmployee,
  createEmployee,
  deleteEmployee,
  updateEmployee,
} = require('../controllers/employee');
const administrator = require('../middleware/administrator');
const auth = require('../middleware/auth');
const tenant = require('../middleware/tenant');

const router = express.Router();

// api/v1/employees
router
  .route('/')
  .get(auth, tenant, administrator, getEmployees)
  .post(auth, tenant, administrator, createEmployee);
// api/v1/employees/:id
router
  .route('/:id')
  .get(auth, tenant, administrator, getEmployee)
  .delete(auth, tenant, administrator, deleteEmployee)
  .put(auth, tenant, administrator, updateEmployee);

module.exports = router;
