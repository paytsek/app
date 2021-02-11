const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');
const tenant = require('../middleware/tenant');
const administrator = require('../middleware/administrator');

const {
  createCompany,
  getCompanies,
  getCompany,
  createCompanySettings,
  updateCompanyName,
  deleteCompany,
  updateCompanySettings,
  deleteCompanySettings,
  getTenant,
  setTenant,
} = require('../controllers/companies');

// /api/v1/companies/name
router.route('/name').post(auth, createCompany);

// api/v1/companies/name/:id
router.route('/name/:id').put(auth, updateCompanyName).delete(auth, deleteCompany);

// api/v1/companies/tenant/:slug
router.route('/tenant/:slug').post(auth, setTenant).get(auth, tenant, getTenant);

// /api/v1/companies
router.route('/').get(auth, getCompanies);

// /api/v1/companies/:id
router.route('/:id').get(auth, getCompany);

// /api/v1/companies/settings
router.route('/settings').post(auth, tenant, administrator, createCompanySettings);

// api/v1/companies/settings/:id
router
  .route('/settings/:id')
  .put(auth, tenant, administrator, updateCompanySettings)
  .delete(auth, tenant, administrator, deleteCompanySettings);

module.exports = router;
