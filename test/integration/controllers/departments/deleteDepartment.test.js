const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const request = require('supertest');
const app = require('../../../../app');
const Company = require('../../../../models/Company');
const Department = require('../../../../models/Department');
const CompanySetting = require('../../../../models/CompanySetting');

describe('DELETE /api/v1/departments/:id - deleteDepartment', () => {
  const url = '/api/v1/departments';
  let token;

  beforeEach(async () => {
    token = await global.signIn();
  });

  describe('Error Response', () => {
    it('should return error response if logged in user is not equal to company user', async () => {
      const company = await Company.create({
        name: 'PayTsek',
        user: mongoose.Types.ObjectId(),
      });

      const res = await request(app)
        .delete(`${url}/${mongoose.Types.ObjectId()}`)
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

    it('should return error response if id is not found id invalid', async () => {
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await Company.create({
        name: 'Fullsuite',
        user: user._id,
      });
      await CompanySetting.create({
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
        .delete(`${url}/${invalidId}`)
        .set({ 'x-company-tenant': company.slug })
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

  describe('Success response', () => {
    it('should return success response if values are valid', async () => {
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await Company.create({
        name: 'Fullsuite',
        user: user._id,
      });
      await CompanySetting.create({
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
      const department = await Department.create({
        name: 'Staff',
        company: company._id,
      });

      const res = await request(app)
        .delete(`${url}/${department._id}`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          success: true,
          department: {},
          message: `Department - ID:${department._id} successfully deleted`,
        }),
      );
    });
  });
});
