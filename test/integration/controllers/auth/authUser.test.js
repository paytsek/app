const request = require('supertest');

const app = require('../../../../app');

describe('GET /api/v1/auth - authUser', () => {
  const url = '/api/v1/auth';

  describe('Error Response', () => {
    it('should return an error response if token is invalid', async () => {
      let res = await request(app).get(url);

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'No token, access denied',
      });

      res = await request(app).get(url).auth('token123', { type: 'bearer' });

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'Not authorize to access this route',
      });
    });
  });

  describe('Success Response', () => {
    it('should return a success response if token is valid', async () => {
      const token = await global.signIn();

      const res = await request(app).get(url).auth(token, { type: 'bearer' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBeTruthy();
      expect(Object.keys(res.body.user)).toEqual(
        expect.arrayContaining([
          'id',
          'email',
          'role',
          'firstName',
          'lastName',
          'fullName',
        ]),
      );
    });
  });
});
