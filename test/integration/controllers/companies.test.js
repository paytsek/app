const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const request = require('supertest');

const app = require('../../../app');
const Company = require('../../../models/Company');
const User = require('../../../models/User');
const CompanySetting = require('../../../models/CompanySetting');

describe('DELETE /api/v1/companies/:id/settings/:companySettingsId - deleteCompanySettings', () => {
  const url = '/api/v1/companies/settings';

  describe('Error Response', () => {
    it('should return error response if not logged in', async () => {
      const res = await request(app).put(`${url}/${mongoose.Types.ObjectId()}`);

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'No token, access denied',
      });
    });

    it('should return error if company not own by the logged in user', async () => {
      const token = await global.signIn();

      const loggedInUser = jwt.verify(token, process.env.JWT_SECRET_KEY);

      const user = await User.create({
        username: 'rodrigocarlos',
        email: 'rodrigo@gmail.com',
        password: '123456',
        firstName: 'Rodrigo',
        lastName: 'Carlos',
      });
      const company = await Company.create({
        name: 'PayTsek',
        user: user._id,
        administrators: [loggedInUser._id],
      });

      const res = await request(app)
        .put(`${url}/${mongoose.Types.ObjectId()}`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'Not authorized to access this route',
      });
    });

    it('should return error if company slug is invalid or not found', async () => {
      const token = await global.signIn();

      const res = await request(app)
        .put(`${url}/${mongoose.Types.ObjectId()}`)
        .set({ 'x-company-tenant': 'invalid-company' })
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'No Company, access denied',
      });
    });

    it('should return error if company does not have settings created', async () => {
      const token = await global.signIn();
      const loggedInUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const companySettingsId = mongoose.Types.ObjectId();
      const company = await Company.create({
        name: 'PayTsek',
        user: loggedInUser._id,
        administrators: [loggedInUser._id],
      });

      const res = await request(app)
        .put(`${url}/${companySettingsId}`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(404);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: `Resource with an id of ${companySettingsId} not found`,
      });
    });

    it('should return 403 if logged in user is not an administrator', async () => {
      const token = await global.signIn();

      const user = await User.create({
        username: 'jane doe',
        email: 'janedoe@gmail.com',
        password: '123456',
        firstName: 'Jane',
        lastName: 'Doe',
      });

      const company = await Company.create({
        name: 'test company',
        user: user._id,
        administrators: [user._id],
      });

      const res = await request(app)
        .post(`${url}`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(403);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: "You don't have permission to access on this route",
      });
    });
  });

  describe('Success Response', () => {
    it('should return success response if logged in user, comany and settings are valid', async () => {
      const token = await global.signIn();
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await Company.create({
        name: 'PayTsek',
        user: user._id,
        administrators: [user._id],
      });
      const companySettings = await CompanySetting.create({
        frequency: 'monthly',
        firstPayout: 5,
        firstCutOff: 1,
        company: company._id,
        registeredAddress: {
          street: '24c Marcoville',
          city: 'Baguio city',
          country: 'Philippines',
          zipCode: '2600',
        },
        departments: [mongoose.Types.ObjectId()],
      });

      const res = await request(app)
        .delete(`${url}/${companySettings._id}`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBeTruthy();
      expect(Object.keys(res.body.companySettings).length).toEqual(0);
      expect(res.body).toEqual(
        expect.objectContaining({
          message: `Company Settings - ID:${companySettings._id} successfully deleted`,
        }),
      );
    });
  });
});

describe('POST /api/v1/companies/tenant/:slug - setcompanyTenant', () => {
  const url = '/api/v1/companies/tenant';

  describe('Error Response', () => {
    it('should return error response if no token', async () => {
      const res = await request(app).post(`${url}/test-company`);

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({ message: 'No token, access denied' });
    });

    it('should return error response if invalid slug params', async () => {
      const token = await global.signIn();
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
      const token = await global.signIn();
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
      const token = await global.signInAdmin();
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

describe('GET /api/v1/companies/tenant/:slug - getCompanyTenant', () => {
  const url = '/api/v1/companies/tenant';

  describe('Error Response', () => {
    it('should return error response if no token', async () => {
      const res = await request(app).get(`${url}/test-company`);

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({ message: 'No token, access denied' });
    });

    it('should return error response if no x-company-tenant set', async () => {
      const token = await global.signIn();

      const res = await request(app)
        .get(`${url}/test-company`)
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({ message: 'No tenant, access denied' });
    });

    it('should return error response if invalid slug params', async () => {
      const token = await global.signIn();
      const company = await Company.create({
        name: 'PayTsek',
        user: mongoose.Types.ObjectId(),
      });

      let res = await await request(app)
        .get(`${url}/invalid`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'No Company, access denied',
      });

      res = await request(app)
        .get(`${url}/${company.slug}`)
        .set({ 'x-company-tenant': company.slug })
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
      const token = await global.signIn();
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await Company.create({ name: 'payTsek', user: user._id });

      const res = await request(app)
        .get(`${url}/${company.slug}`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBeTruthy();
      expect(res.body.tenant).toMatchObject({
        slug: company.slug,
        id: company._id.toString(),
      });
    });

    it('should return success response if user is an admin', async () => {
      const token = await global.signInAdmin();
      const company = await Company.create({
        name: 'payTsek',
        user: mongoose.Types.ObjectId(),
      });

      const res = await request(app)
        .get(`${url}/paytsek`)
        .set({ 'x-company-tenant': company.slug })
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
