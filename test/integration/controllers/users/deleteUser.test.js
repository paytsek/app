const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../../../../app');
const User = require('../../../../models/User');

describe('DELETE /api/users/:id deleteUser', () => {
  const url = '/api/v1/users';
  let admin;
  let payload;
  let user;

  beforeEach(async () => {
    admin = await User.create({
      username: 'darryl',
      email: 'darryl@gmail.com',
      password: '123456',
      firstName: 'Darryl',
      lastName: 'Mangibin',
      role: 'admin',
    });
    user = await User.create({
      username: 'rodrigo',
      email: 'rodrigo@gmail.com',
      password: '123456',
      firstName: 'rodrigo',
      lastName: 'carlos',
      role: 'member',
    });
    payload = {
      _id: admin._id,
      email: admin.email,
      username: admin.username,
      firstName: admin.firstName,
      lastName: admin.lastName,
    };
  });

  describe('Error Response', () => {
    it('should return an error response if id is invalid or not found', async () => {
      const invalidId = mongoose.Types.ObjectId();
      const token = await global.signIn(payload);

      const res = await request(app)
        .delete(`${url}/${invalidId}`)
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(400);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: `Resource with an id of ${invalidId} not found`,
      });
    });

    it('should return an error response if not logged in', async () => {
      const res = await request(app).delete(`${url}/${mongoose.Types.ObjectId()}`);

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({ message: 'No token, access denied' });
    });

    it('should return an error if password or fields are invalid', async () => {
      const token = await global.signIn(payload);

      let res = await request(app)
        .delete(`${url}/${user._id}`)
        .auth(token, { type: 'bearer' })
        .send({ password: '1234', confirmPassword: '123456' });

      expect(res.status).toBe(400);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'Password and password confirmation mismatch',
      });

      res = await request(app)
        .delete(`${url}/${user._id}`)
        .auth(token, { type: 'bearer' })
        .send({ password: '1234567', confirmPassword: '1234567' });

      expect(res.status).toBe(400);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({ message: 'Invalid password' });
    });
  });

  describe('Success Response', () => {
    it('should return a success response if password and confirmPassword are valid', async () => {
      const token = await global.signIn(payload);

      const res = await request(app)
        .delete(`${url}/${user._id}`)
        .auth(token, { type: 'bearer' })
        .send({ password: '123456', confirmPassword: '123456' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBeTruthy();
      expect(res.body).toEqual(
        expect.objectContaining({ message: 'Successfully deleted' }),
      );

      const users = await User.find({});

      expect(users).not.toEqual(
        expect.arrayContaining([expect.objectContaining({ _id: user._id })]),
      );
    });
  });
});
