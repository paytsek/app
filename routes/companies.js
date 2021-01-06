const express = require('express');
const router = express.Router();

const {
	createCompany,
	getCompanies,
	getCompany,
	createCompanySettings,
} = require('../controllers/companies');

router.route('/name').post(createCompany);
router.route('/').get(getCompanies);
router.route('/:id').get(getCompany);
router.route('/:id/settings').post(createCompanySettings);

module.exports = router;
