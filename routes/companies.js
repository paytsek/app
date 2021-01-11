const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const {
	createCompany,
	getCompanies,
	getCompany,
	createCompanySettings,
	updateCompanyName,
	deleteCompany,
	updateCompanySettings,
} = require('../controllers/companies');

router.route('/name').post(auth, createCompany);
router
	.route('/name/:id')
	.put(auth, updateCompanyName)
	.delete(auth, deleteCompany);
router.route('/').get(getCompanies);
router.route('/:id').get(getCompany);
router.route('/:id/settings').post(auth, createCompanySettings);
router
	.route('/:id/settings/:companySettingsId')
	.put(auth, updateCompanySettings);

module.exports = router;
