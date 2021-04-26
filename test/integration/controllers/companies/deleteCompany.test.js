const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const request = require('supertest');

const app = require('../../../../app');
const User = require('../../../../models/User');
const CompanySetting = require('../../../../models/CompanySetting');
const Company = require('../../../../models/Company');

describe('DELETE /api/v1/companies/name/:id - deleteCompany', () => {
  const url = '/api/v1/companies/name';
  let token;

  beforeEach(async () => {
    token = await global.signIn();
  });

  describe('Error Response', () => {
    it('should return error response if not logged in', async () => {
      const res = await request(app).delete(
        `${url}/${mongoose.Types.ObjectId().toHexString()}`,
      );

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'No token, access denied',
      });
    });

    it('should return error response if id params is invalid', async () => {
      const id = mongoose.Types.ObjectId().toHexString();

      const res = await request(app)
        .delete(`${url}/${id}`)
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(404);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: `Resource with an id of ${id} not found`,
      });
    });

    it('should return error response if logged user not own the company', async () => {
      const user = await User.create({
        username: 'rodrigocarlos',
        email: 'rodrigo@gmail.com',
        password: '123456',
        firstName: 'Rodrigo',
        lastName: 'Carlos',
      });
      const company = await Company.create({
        name: 'Sample company',
        user: user._id,
      });

      const res = await request(app)
        .delete(`${url}/${company._id}`)
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'Not authorized to access this route',
      });
    });
  });

  describe('Success Response', () => {
    it('should return success response if values are valid', async () => {
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await Company.create({
        name: 'PayTsek',
        user: user._id,
      });
      await CompanySetting.create({
        company: company._id,
        frequency: 'monthly',
        firstCutOff: 1,
        firstPayout: 5,
        registeredAddress: {
          street: '24c Marcoville',
          city: 'Baguio city',
          country: 'Philippines',
          zipCode: '2600',
        },
        departments: [mongoose.Types.ObjectId().toHexString()],
      });

      expect(await CompanySetting.countDocuments()).toBe(1);

      const res = await request(app)
        .delete(`${url}/${company._id}`)
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBeTruthy();
      expect(Object.keys(res.body.company).length).toEqual(0);
      expect(res.body).toEqual(
        expect.objectContaining({
          message: `PayTsek - ID:${company._id} successfully deleted`,
        }),
      );
      expect(await CompanySetting.countDocuments()).toEqual(0);
    });

    it('should return success response logged in is an admin', async () => {
      token = await global.signInAdmin();
      const user = await User.create({
        username: 'rodrigo',
        email: 'rodrigo@gmail.com',
        password: '123456',
        firstName: 'Rodrigo',
        lastName: 'Carlos',
      });
      const company = await Company.create({
        name: 'PayTsek',
        user: user._id,
      });
      await CompanySetting.create({
        company: company._id,
        frequency: 'monthly',
        firstCutOff: 1,
        firstPayout: 5,
        registeredAddress: {
          street: '24c Marcoville',
          city: 'Baguio city',
          country: 'Philippines',
          zipCode: '2600',
        },
        departments: [mongoose.Types.ObjectId().toHexString()],
      });

      expect(await CompanySetting.countDocuments()).toBe(1);

      const res = await request(app)
        .delete(`${url}/${company._id}`)
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBeTruthy();
      expect(Object.keys(res.body.company).length).toEqual(0);
      expect(res.body).toEqual(
        expect.objectContaining({
          message: `PayTsek - ID:${company._id} successfully deleted`,
        }),
      );
      expect(await CompanySetting.countDocuments()).toEqual(0);
    });
  });
});
