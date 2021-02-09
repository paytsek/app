const express = require('express');

const router = express.Router();
const {
  getDepartments,
  updateDepartment,
  deleteDepartment,
} = require('../controllers/departments');
const tenant = require('../middleware/tenant');
const auth = require('../middleware/auth');

router.route('/').get(auth, tenant, getDepartments);
router.route('/:id').put(auth, tenant, updateDepartment).delete(auth, tenant, deleteDepartment);

module.exports = router;
