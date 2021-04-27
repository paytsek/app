const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const request = require('supertest');

const app = require('../../../../app');
const User = require('../../../../models/User');
const CompanySetting = require('../../../../models/CompanySetting');
const Company = require('../../../../models/Company');

describe('DELETE /api/v1/companies/:id/settings/:companySettingsId - deleteCompanySettings', () => {
  const url = '/api/v1/companies/settings';
  let token;

  beforeEach(async () => {
    token = await global.signIn();
  });

  describe('Error Response', () => {
    it('should return error response if not logged in', async () => {
      const res = await request(app).put(
        `${url}/${mongoose.Types.ObjectId().toHexString()}`,
      );

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'No token, access denied',
      });
    });

    it('should return error if company not own by the logged in user', async () => {
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
        .put(`${url}/${mongoose.Types.ObjectId().toHexString()}`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'Not authorized to access this route',
      });
    });

    it('should return error if company slug is invalid or not found', async () => {
      const res = await request(app)
        .put(`${url}/${mongoose.Types.ObjectId().toHexString()}`)
        .set({ 'x-company-tenant': 'invali-tenant' })
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'No Company, access denied',
      });
    });

    it('should return error if company does not have settings created', async () => {
      const loggedInUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const companySettingsId = mongoose.Types.ObjectId().toHexString();
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
        departments: [mongoose.Types.ObjectId().toHexString()],
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
