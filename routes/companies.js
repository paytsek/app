const express = require('express');
const router = express.Router();

const { createCompany, getCompanies } = require('../controllers/companies');

router.route('/name').post(createCompany);
router.route('/').get(getCompanies);

module.exports = router;
