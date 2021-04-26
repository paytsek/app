const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const request = require('supertest');
const app = require('../../../../app');
const TestUtils = require('../../../../utils/testUtils');

describe('POST /api/v1/departments - createDepartment', () => {
  const url = '/api/v1/departments';
  let token;

  beforeEach(async () => {
    token = await global.signIn();
  });

  describe('Error Response', () => {
    it('should return error response if not logged in', async () => {
      const res = await request(app).post(url);

      expect(res.status).toBe(401);
      expect(res.body).toEqual(
        expect.objectContaining({
          success: false,
          errors: expect.objectContaining({
            message: 'No token, access denied',
          }),
        }),
      );
    });

    it('should return error response if logged in user is not equal to company user', async () => {
      const company = await TestUtils.createCompany({
        name: 'Full suite',
        user: mongoose.Types.ObjectId(),
      });

      const res = await request(app)
        .get(url)
        .set(TestUtils.responseSetObject(company.slug))
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
      const res = await request(app).get(url).auth(token, { type: 'bearer' });

      expect(res.status).toBe(401);
      expect(res.body).toEqual(
        expect.objectContaining({
          success: false,
          errors: expect.objectContaining({ message: 'No tenant, access denied' }),
        }),
      );
    });

    it('should return error response if name is empty', async () => {
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await TestUtils.createCompany({ name: 'PayTsek', user: user._id });
      await TestUtils.createCompanySetting({
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

      const res = await request(app)
        .post(url)
        .set(TestUtils.responseSetObject(company.slug))
        .auth(token, { type: 'bearer' })
        .send({ name: '' });

      expect(res.status).toBe(400);
      expect(res.body).toEqual(
        expect.objectContaining({
          success: false,
          errors: expect.objectContaining({
            name: 'Please enter a department',
          }),
        }),
      );
    });
  });

  describe('Success Response', () => {
    it('should return success response if values are valid', async () => {
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await TestUtils.createCompany({ name: 'PayTsek', user: user._id });
      await TestUtils.createCompanySetting({
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

      const res = await request(app)
        .post(url)
        .set(TestUtils.responseSetObject(company.slug))
        .auth(token, { type: 'bearer' })
        .send({ name: 'Staff' });

      expect(res.status).toBe(201);
      expect(res.body).toEqual(
        expect.objectContaining({
          success: true,
          department: expect.objectContaining({
            name: 'Staff',
          }),
        }),
      );
    });
  });
});
