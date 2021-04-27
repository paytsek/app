const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../../../../app');
const User = require('../../../../models/User');

describe('GET /api/v1/users/:id - getUser', () => {
  const url = '/api/v1/users';

  describe('Error Response', () => {
    it('should return 401 status code and error response if not logged in', async () => {
      const res = await request(app).get(`${url}/${mongoose.Types.ObjectId()}`);

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'No token, access denied',
      });
    });

    it('should return 404 is id is not found or invalid', async () => {
      const token = await global.signInAdmin();

      const id = mongoose.Types.ObjectId();

      let res = await request(app).get(`${url}/${id}`).auth(token, { type: 'bearer' });

      expect(res.status).toBe(404);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: `Resource with an id of ${id} not found`,
      });

      const invalidObjectId = '1491nv94';

      res = await request(app)
        .get(`${url}/${invalidObjectId}`)
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(404);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: `Resource with an id of ${invalidObjectId} not found`,
      });
    });

    it('should return 403 status code and error response if not admin', async () => {
      const token = await global.signIn();
      const id = mongoose.Types.ObjectId();
      const res = await request(app).get(`${url}/${id}`).auth(token, { type: 'bearer' });

      expect(res.status).toBe(403);
      expect(res.body).toEqual(
        expect.objectContaining({
          success: false,
          errors: expect.objectContaining({
            message: "You don't have permission to access on this route",
          }),
        }),
      );
    });
  });

  describe('Success Response', () => {
    it('should return 200 success reponse if id is valid', async () => {
      const token = await global.signInAdmin();

      const user = await User.create({
        username: 'Rodrigo Carlos',
        email: 'rodrigo@gmail.com',
        password: '123456',
        firstName: 'Carlos',
        lastName: 'Rodrigo',
      });

      const res = await request(app)
        .get(`${url}/${user._id}`)
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBeTruthy();
      expect(res.body.user).toHaveProperty(
        '_id',
        user._id,
        'username',
        user.username,
        'email',
        user.email,
      );
    });
  });
});
