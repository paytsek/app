const express = require('express');

const { getEmployee } = require('../controllers/employee');

const router = express.Router();

router.route('/').get(getEmployee);

module.exports = router;
