const request = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const app = require('../../../../app');
const User = require('../../../../models/User');

describe('GET /api/v1/users - getUsers', () => {
  const url = '/api/v1/users';

  describe('Error Response', () => {
    it('should return 401 status code and error response if authorization is empty or invalid', async () => {
      let res = await request(app).get(url).auth('', { type: 'bearer' });

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'No token, access denied',
      });

      const payload = {
        id: mongoose.Types.ObjectId(),
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: 3600,
      });

      res = await request(app).get(url).auth(token, { type: 'bearer' });

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'No user, access denied',
      });
    });

    it('should return 403 status code if not an admin', async () => {
      const token = await global.signIn();

      const res = await request(app).get(url).auth(token, { type: 'bearer' });

      expect(res.status).toBe(403);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: "You don't have permission to access on this route",
      });
    });
  });

  describe('Success Response', () => {
    it('should return success response if logged in user is an admin', async () => {
      const admin = await User.create({
        email: 'darryl@gmail.com',
        username: 'darryl',
        firstName: 'Darryl',
        lastName: 'Mangibin',
        password: '123456',
        role: 'admin',
      });
      const payload = {
        _id: admin._id,
        email: admin.email,
        username: admin.username,
        firstName: admin.firstName,
        lastName: admin.lastName,
      };
      await User.create({
        email: 'darryl@gmail1.com',
        username: 'darrylm',
        firstName: 'Darryl',
        lastName: 'Mangibin',
        password: '123456',
      });
      const token = await global.signIn(payload);

      const res = await request(app).get(url).auth(token, { type: 'bearer' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBeTruthy();
      expect(res.body.users).toEqual(
        expect.arrayContaining([expect.objectContaining({ email: 'darryl@gmail1.com' })]),
      );
    });
  });
});
