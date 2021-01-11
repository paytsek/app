const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const {
	createCompany,
	getCompanies,
	getCompany,
	createCompanySettings,
	updateCompanyName,
} = require('../controllers/companies');

router.route('/name').post(auth, createCompany);
router.route('/name/:id').put(auth, updateCompanyName);
router.route('/').get(getCompanies);
router.route('/:id').get(getCompany);
router.route('/:id/settings').post(auth, createCompanySettings);

module.exports = router;
