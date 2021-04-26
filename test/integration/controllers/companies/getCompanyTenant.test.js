const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const request = require('supertest');

const app = require('../../../../app');
const TestUtils = require('../../../../utils/testUtils');

describe('GET /api/v1/companies/tenant/:slug - getCompanyTenant', () => {
  const url = '/api/v1/companies/tenant';
  let token;

  beforeEach(async () => {
    token = await global.signIn();
  });

  describe('Error Response', () => {
    it('should return error response if no token', async () => {
      const res = await request(app).get(`${url}/test-company`);

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({ message: 'No token, access denied' });
    });

    it('should return error response if no x-company-tenant set', async () => {
      const res = await request(app)
        .get(`${url}/test-company`)
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({ message: 'No tenant, access denied' });
    });

    it('should return error response if invalid slug params', async () => {
      const company = await TestUtils.createCompany({
        name: 'PayTsek',
        user: mongoose.Types.ObjectId(),
      });

      let res = await await request(app)
        .get(`${url}/invalid`)
        .set(TestUtils.responseSetObject(company.slug))
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'No Company, access denied',
      });

      res = await request(app)
        .get(`${url}/${company.slug}`)
        .set(TestUtils.responseSetObject(company.slug))
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'Not authorize to access this route',
      });
    });
  });

  describe('Success Response', () => {
    it('should return success response if valid slug', async () => {
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await TestUtils.createCompany({ name: 'payTsek', user: user._id });

      const res = await request(app)
        .get(`${url}/${company.slug}`)
        .set(TestUtils.responseSetObject(company.slug))
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBeTruthy();
      expect(res.body.tenant).toMatchObject({
        slug: company.slug,
        id: company._id.toString(),
      });
    });

    it('should return success response if user is an admin', async () => {
      token = await global.signInAdmin();
      const company = await TestUtils.createCompany({
        name: 'payTsek',
        user: mongoose.Types.ObjectId(),
      });

      const res = await request(app)
        .get(`${url}/paytsek`)
        .set(TestUtils.responseSetObject(company.slug))
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBeTruthy();
      expect(res.body.tenant).toMatchObject({
        slug: 'paytsek',
        id: company._id.toString(),
      });
    });
  });
});
