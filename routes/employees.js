const express = require('express');

const { getEmployees, createEmployee } = require('../controllers/employee');
const administrator = require('../middleware/administrator');
const auth = require('../middleware/auth');
const tenant = require('../middleware/tenant');

const router = express.Router();

router
  .route('/')
  .get(auth, tenant, administrator, getEmployees)
  .post(auth, tenant, administrator, createEmployee);

module.exports = router;
