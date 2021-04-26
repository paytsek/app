const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const request = require('supertest');
const app = require('../../../../app');
const TestUtils = require('../../../../utils/testUtils');

describe('PUT /api/v1/departments/:id - updateDepartment', () => {
  const url = '/api/v1/departments';
  let token;

  beforeEach(async () => {
    token = await global.signIn();
  });

  describe('Error response', () => {
    it('should return error response if logged in user is not equal to company user', async () => {
      const company = await TestUtils.createCompany({
        name: 'Fullsuite',
        user: mongoose.Types.ObjectId(),
      });

      const res = await request(app)
        .put(`${url}/${mongoose.Types.ObjectId()}`)
        .set(TestUtils.responseSetObject(company.slug))
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(401);
      expect(res.body).toEqual(
        expect.objectContaining({
          success: false,
          errors: expect.objectContaining({
            message: 'Not authorized, access denied',
          }),
        }),
      );
    });

    it('should return error response if id is not found id invalid', async () => {
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await TestUtils.createCompany({
        name: 'Fullsuite',
        user: user._id,
      });
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

      const invalidId = mongoose.Types.ObjectId();

      const res = await request(app)
        .put(`${url}/${invalidId}`)
        .set(TestUtils.responseSetObject(company.slug))
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(404);
      expect(res.body).toEqual(
        expect.objectContaining({
          success: false,
          errors: expect.objectContaining({
            message: `Resource with an id of ${invalidId} not found`,
          }),
        }),
      );
    });
  });

  describe('Success Response', () => {
    it('should return success response if values are valid', async () => {
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await TestUtils.createCompany({
        name: 'Fullsuite',
        user: user._id,
      });
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
      const department = await TestUtils.createDepartment({
        name: 'Staff',
        company: company._id,
      });

      const res = await request(app)
        .put(`${url}/${department._id}`)
        .set(TestUtils.responseSetObject(company.slug))
        .auth(token, { type: 'bearer' })
        .send({ name: 'Paytsek' });

      expect(res.status).toBe(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          success: true,
          message: 'Department successfully updated',
          department: expect.objectContaining({
            name: 'Paytsek',
          }),
        }),
      );
    });
  });
});
