const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const request = require('supertest');
const app = require('../../../app');
const Company = require('../../../models/Company');
const Department = require('../../../models/Department');
const CompanySetting = require('../../../models/CompanySetting');

describe('GET /api/v1/departments', () => {
  const url = '/api/v1/departments';

  describe('Error response', () => {
    it('should return error response if not logged in', async () => {
      const res = await request(app).get(url);

      expect(res.status).toBe(401);
      expect(res.body).toEqual(
        expect.objectContaining({
          success: false,
          errors: expect.objectContaining({ message: 'No token, access denied' }),
        }),
      );
    });

    it('should return error response if logged in user is not equal to company user', async () => {
      const token = await global.signIn();
      const company = await Company.create({ name: 'Full suite', user: mongoose.Types.ObjectId() });

      const res = await request(app)
        .get(url)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(401);
      expect(res.body).toEqual(
        expect.objectContaining({
          success: false,
          errors: expect.objectContaining({ message: 'Not authorized, access denied' }),
        }),
      );
    });

    it('should return error response if no company set', async () => {
      const token = await global.signIn();

      const res = await request(app).get(url).auth(token, { type: 'bearer' });

      expect(res.status).toBe(401);
      expect(res.body).toEqual(
        expect.objectContaining({
          success: false,
          errors: expect.objectContaining({ message: 'No tenant, access denied' }),
        }),
      );
    });
  });

  describe('Success response', () => {
    it('should return success response if company is set', async () => {
      const token = await global.signIn();
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await Company.create({ name: 'PayTsek', user: user._id });
      const companySettings = await CompanySetting.create({
        company: company._id,
        firstCutOff: 1,
        firstPayout: 5,
        secondCutOff: 15,
        secondPayout: 20,
        registeredAddress: {
          street: '24c Marcoville',
          city: 'Baguio city',
          country: 'Philippines',
          zipCode: '2600',
        },
      });
      Department.create([
        { name: 'Staff', company: company._id, companySettings: companySettings._id },
        { name: 'Senior', company: company._id, companySettings: companySettings._id },
      ]);

      const res = await request(app)
        .get(url)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          success: true,
          departments: expect.arrayContaining([
            expect.objectContaining({ name: 'Staff' }),
            expect.objectContaining({ name: 'Senior' }),
          ]),
        }),
      );
    });
  });
});
