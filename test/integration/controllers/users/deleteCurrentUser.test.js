const request = require('supertest');

const app = require('../../../../app');
const User = require('../../../../models/User');

describe('DELETE /api/users/current-user - deleteCurrentUser', () => {
  const url = '/api/v1/users/current-user';
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

  describe('Error Response', () => {
    it('should return 401 Unauthorized if not logged in', async () => {
      const res = await request(app).delete(url);

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'No token, access denied',
      });
    });

    it('should return error response if password is empty', async () => {
      const token = await global.signIn(payload);
      const res = await request(app)
        .delete(url)
        .auth(token, { type: 'bearer' })
        .send({ password: '' });

      expect(res.status).toBe(400);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'Please enter your password',
      });
    });

    it('should return error response if password and confirmPassword mismatch', async () => {
      const token = await global.signIn();
      const res = await request(app).delete(url).auth(token, { type: 'bearer' }).send({
        password: '1234567',
        confirmPassword: '123456',
      });

      expect(res.status).toBe(400);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'Entered Password and password confirmation mismatch',
      });
    });

    it('should return error response if current password and password entered mismatch', async () => {
      const token = await global.signIn();
      const res = await request(app).delete(url).auth(token, { type: 'bearer' }).send({
        password: '1234567',
        confirmPassword: '1234567',
      });

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'Invalid password',
      });
    });
  });

  describe('Success Response', () => {
    it('should return a success response if values entered are valid', async () => {
      const token = await global.signIn();
      const res = await request(app).delete(url).auth(token, { type: 'bearer' }).send({
        password: '123456',
        confirmPassword: '123456',
      });

      expect(res.status).toBe(200);
      expect(res.body.success).toBeTruthy();
      expect(Object.keys(res.body.user).length).toEqual(0);
      expect(res.body).toEqual(
        expect.objectContaining({ message: 'User successfully deleted' }),
      );
    });
  });
});
