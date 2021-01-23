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
  deleteCompanySettings,
} = require('../controllers/companies');

// /api/v1/companies/name
router.route('/name').post(auth, createCompany);

// api/v1/companies/name/:id
router.route('/name/:id').put(auth, updateCompanyName).delete(auth, deleteCompany);

// /api/v1/companies
router.route('/').get(getCompanies);

// /api/v1/companies/:id
router.route('/:id').get(getCompany);

// /api/v1/companies/:id/settings
router.route('/:id/settings').post(auth, createCompanySettings);

// api/v1/companies/:id/settings/:companySettingsId
router
  .route('/:id/settings/:companySettingsId')
  .put(auth, updateCompanySettings)
  .delete(auth, deleteCompanySettings);

module.exports = router;
