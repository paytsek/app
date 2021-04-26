const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const request = require('supertest');

const app = require('../../../../app');
const Company = require('../../../../models/Company');

describe('POST /api/v1/companies/tenant/:slug - setcompanyTenant', () => {
  const url = '/api/v1/companies/tenant';
  let token;

  beforeEach(async () => {
    token = await global.signIn();
  });

  describe('Error Response', () => {
    it('should return error response if no token', async () => {
      const res = await request(app).post(`${url}/test-company`);

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({ message: 'No token, access denied' });
    });

    it('should return error response if invalid slug params', async () => {
      const company = await Company.create({
        name: 'PayTsek',
        user: mongoose.Types.ObjectId(),
      });

      let res = await request(app).post(`${url}/invalid`).auth(token, { type: 'bearer' });

      expect(res.status).toBe(404);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'Resource with an id of invalid not found',
      });

      res = await request(app)
        .post(`${url}/${company.slug}`)
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
      const company = await Company.create({ name: 'payTsek', user: user._id });

      const res = await request(app)
        .post(`${url}/${company.slug}`)
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBeTruthy();
      expect(res.body.tenant).toMatchObject({
        slug: 'paytsek',
        id: company._id.toString(),
      });
    });

    it('should return success response if user is an admin', async () => {
      token = await global.signInAdmin();
      const company = await Company.create({
        name: 'payTsek',
        user: mongoose.Types.ObjectId(),
      });

      const res = await request(app)
        .post(`${url}/paytsek`)
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
