const express = require('express');

const { getEmployees, getEmployee, createEmployee } = require('../controllers/employee');
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
router.route('/:id').get(auth, tenant, administrator, getEmployee);

module.exports = router;
