const express = require('express');
const router = express.Router();

const { createCompany } = require('../controllers/companies');

router.route('/name').post(createCompany);

module.exports = router;
