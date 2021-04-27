const request = require('supertest');
const jwt = require('jsonwebtoken');

const app = require('../../../../app');
const User = require('../../../../models/User');

describe('PUT /api/v1/users/current-user - updateCurrentUser', () => {
  const url = '/api/v1/users/current-user';

  describe('Error Response', () => {
    it('should validate fields and return error response', async () => {
      const token = await global.signIn();

      await User.create({
        username: 'rodrigo carlos',
        email: 'rodrigo@gmail.com',
        password: '123456',
        firstName: 'Rodrigo',
        lastName: 'Carlost',
      });

      let res = await request(app).put(url).auth(token, { type: 'bearer' }).send({});

      expect(res.status).toBe(400);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toEqual(
        expect.objectContaining({
          username: 'Username is required',
          email: 'Email is required',
          firstName: 'First name is required',
          lastName: 'Last name is required',
        }),
      );

      res = await request(app).put(url).auth(token, { type: 'bearer' }).send({
        username: 'rodrigo carlos',
        email: 'rodrigo@gmail.com',
        firstName: 'Rods',
        lastName: 'Carls',
      });

      expect(res.status).toBe(400);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        username: 'Username already exist',
        email: 'Email already exist',
      });
    });
  });

  describe('Success Response', () => {
    it('should successfully update current user', async () => {
      const token = await global.signIn();

      const loggedInUser = jwt.verify(token, process.env.JWT_SECRET_KEY);

      const res = await request(app).put(url).auth(token, { type: 'bearer' }).send({
        username: 'rodrigo pogi',
        email: 'rodrigo@cute.com',
        firstName: 'Rodrigo',
        lastName: 'Carlos',
      });

      expect(res.status).toBe(200);
      expect(res.body.success).toBeTruthy();
      expect(res.body.user._id).toEqual(loggedInUser._id);
      expect(res.body.user).not.toEqual(
        expect.objectContaining({
          username: loggedInUser.username,
          email: loggedInUser.email,
          firstName: loggedInUser.firstName,
          lastName: loggedInUser.lastName,
        }),
      );
      expect(res.body.user).toMatchObject({
        username: 'rodrigo pogi',
        email: 'rodrigo@cute.com',
        firstName: 'Rodrigo',
        lastName: 'Carlos',
      });
    });
  });
});
