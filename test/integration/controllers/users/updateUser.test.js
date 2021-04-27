const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../../../../app');
const User = require('../../../../models/User');

describe('PUT /api/v1/users/:id - updateUser', () => {
  const url = '/api/v1/users';

  describe('Error Response', () => {
    it('should return error response if not logged and if not admin', async () => {
      const token = await global.signIn();
      const user = await User.create({
        email: 'carlos@gmail.com',
        username: 'rodrigo',
        firstName: 'Rodrigo',
        lastName: 'Carlos',
        password: '123456',
      });

      let res = await request(app).put(`${url}/${mongoose.Types.ObjectId()}`);

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'No token, access denied',
      });

      res = await request(app).put(`${url}/${user._id}`).auth(token, { type: 'bearer' });

      expect(res.status).toBe(403);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: "You don't have permission to access on this route",
      });
    });
  });

  describe('Success Response', () => {
    it('should return a success response if logged and an admin user', async () => {
      const user = await User.create({
        email: 'carlos@gmail.com',
        username: 'rodrigo',
        firstName: 'Rodrigo',
        lastName: 'Carlos',
        password: '123456',
      });
      const token = await global.signInAdmin();
      const res = await request(app)
        .put(`${url}/${user._id}`)
        .auth(token, { type: 'bearer' })
        .send({ email: 'rodrigo@example.com' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBeTruthy();
      expect(res.body).toEqual(
        expect.objectContaining({ message: 'Successfully updated' }),
      );
      expect(res.body.user).toEqual(
        expect.objectContaining({ email: 'rodrigo@example.com' }),
      );
    });
  });
});
