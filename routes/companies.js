const express = require('express');
const router = express.Router();

const {
	createCompany,
	getCompanies,
	getCompany,
} = require('../controllers/companies');

router.route('/name').post(createCompany);
router.route('/').get(getCompanies);
router.route('/:id').get(getCompany);

module.exports = router;
