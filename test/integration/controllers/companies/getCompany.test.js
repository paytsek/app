const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../../../../app');
const TestUtils = require('../../../../utils/testUtils');

describe('GET /api/v1/companies/:id - getCompany', () => {
  const url = '/api/v1/companies';

  describe('Error Response', () => {
    it('should return error response if not logged in', async () => {
      const res = await request(app).get(`${url}/${mongoose.Types.ObjectId()}`);

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({ message: 'No token, access denied' });
    });

    it('should return error response if not own the company', async () => {
      const user = await TestUtils.createUser({
        email: 'rodrigo@gmail.com',
        password: '123456',
        username: 'rodrigo123',
        firstName: 'Rodrigo',
        lastName: 'Carlos',
      });
      const company = await TestUtils.createCompany({ user: user._id, name: 'PayTsek' });
      const token = await global.signIn();

      const res = await request(app)
        .get(`${url}/${company._id}`)
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'Not authorize to access this route',
      });
    });
  });

  describe('Success Response', () => {
    it('should return success response if logged in and admin', async () => {
      const admin = await TestUtils.createUser({
        username: 'rodrigo',
        email: 'rodrigo@gmail.com',
        password: '123456',
        firstName: 'Rodrigo',
        lastName: 'Carlos',
        role: 'admin',
      });
      const payload = {
        _id: admin._id,
        email: admin.email,
        firstName: admin.firstName,
        lastName: admin.lastName,
      };
      const user = await TestUtils.createUser({
        username: 'rodrigo1',
        email: 'rodrigo@gmail1.com',
        password: '123456',
        firstName: 'Rodrigo1',
        lastName: 'Carlos1',
      });
      const company = await TestUtils.createCompany({ name: 'PayTsek', user: user._id });
      let token = await global.signIn({ _id: user._id });

      let res = await request(app)
        .get(`${url}/${company._id}`)
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBeTruthy();
      expect(res.body.company).toEqual(
        expect.objectContaining({
          name: 'PayTsek',
          slug: 'paytsek',
          _id: company._id.toString(),
        }),
      );

      token = await global.signInAdmin(payload);

      res = await request(app)
        .get(`${url}/${company._id}`)
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBeTruthy();
      expect(res.body.company).toEqual(
        expect.objectContaining({
          name: 'PayTsek',
          slug: 'paytsek',
          _id: company._id.toString(),
        }),
      );
    });
  });
});
