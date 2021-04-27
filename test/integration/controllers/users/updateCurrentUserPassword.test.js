const request = require('supertest');

const app = require('../../../../app');
const User = require('../../../../models/User');

describe('PUT /api/v1/users/current-user/password - updateCurrentUserPassword', () => {
  const url = '/api/v1/users/current-user/password';
  let loggedInUser;
  let payload;

  beforeEach(async () => {
    loggedInUser = await User.create({
      username: 'rodrigo carlos',
      password: '123456',
      email: 'rodrigo@gmail.com',
      firstName: 'Rodrigo',
      lastName: 'Carlos',
    });
    payload = {
      _id: loggedInUser._id,
      email: loggedInUser.email,
      username: loggedInUser.username,
      firstName: loggedInUser.firstName,
      lastName: loggedInUser.lastName,
    };
  });

  describe('Error response', () => {
    it('should return return 401 if not logged in or no token', async () => {
      const res = await request(app).put(url);

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'No token, access denied',
      });
    });

    it('should return 400 if fields are empty', async () => {
      const token = await global.signIn(payload);
      const res = await request(app).put(url).auth(token, { type: 'bearer' }).send({});

      expect(res.status).toBe(400);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'Please fill all fields',
      });
    });

    it('should have an error if new password and password confirmation is mismatch', async () => {
      const token = await global.signIn(payload);
      const res = await request(app).put(url).auth(token, { type: 'bearer' }).send({
        currentPassword: '123456',
        newPassword: '1234567',
        confirmPassword: '12345678',
      });

      expect(res.status).toBe(400);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'New password and confirmation password mismatch',
      });
    });

    it('should have error if current password entered is mismatch from the logged in current password', async () => {
      const token = await global.signIn(payload);
      const res = await request(app).put(url).auth(token, { type: 'bearer' }).send({
        currentPassword: '1234566',
        newPassword: '1234567',
        confirmPassword: '1234567',
      });

      expect(res.status).toBe(400);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({ message: 'Invalid password' });
    });
  });

  describe('Success response', () => {
    it('should return a success response if fields are valid', async () => {
      const token = await global.signIn(payload);
      const res = await request(app).put(url).auth(token, { type: 'bearer' }).send({
        currentPassword: '123456',
        newPassword: '1234567',
        confirmPassword: '1234567',
      });

      expect(res.status).toBe(200);
      expect(res.body.success).toBeTruthy();
      expect(res.body.user).toEqual(
        expect.objectContaining({
          _id: loggedInUser._id.toString(),
          username: 'rodrigo carlos',
          email: 'rodrigo@gmail.com',
          firstName: 'Rodrigo',
          lastName: 'Carlos',
          fullName: 'Rodrigo Carlos',
        }),
      );
    });
  });
});
