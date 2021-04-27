const request = require('supertest');
const jwt = require('jsonwebtoken');

const app = require('../../../../app');

describe('GET /api/v1/users/current-user - getCurrentUser', () => {
  const url = '/api/v1/users/current-user';

  describe('Error Response', () => {
    it('should return 401 if not logged in', async () => {
      const res = await request(app).get(url);

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'No token, access denied',
      });
    });
  });

  describe('Success Response', () => {
    it('should get the current user if logged in', async () => {
      const token = await global.signIn();

      const res = await request(app).get(url).auth(token, { type: 'bearer' });
      const currentUser = jwt.verify(token, process.env.JWT_SECRET_KEY);

      expect(res.status).toBe(200);
      expect(res.body.success).toBeTruthy();
      expect(res.body.user._id).toEqual(currentUser._id);
    });
  });
});
