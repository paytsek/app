const jwt = require('jsonwebtoken');
const request = require('supertest');

const app = require('../../../../app');
const Company = require('../../../../models/Company');

describe('GET api/v1/companies - getCompanies', () => {
  const url = '/api/v1/companies';

  describe('Error Response', () => {
    it('should return error reponse if not logged in', async () => {
      const res = await request(app).get(url);

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({ message: 'No token, access denied' });
    });

    it('should return error if token is invalid', async () => {
      const token = jwt.sign({ name: 'invalid' }, 'secret');

      const res = await request(app).get(url).auth(token, { type: 'bearer' });

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'Not authorize to access this route',
      });
    });
  });

  describe('Success Response', () => {
    it('should get all companies and 200 status code', async () => {
      const token = await global.signIn();
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);

      await Company.create([
        { name: 'PayTsek', user: user._id },
        { name: 'Fullsuite', user: user._id },
      ]);

      const { status, body } = await request(app)
        .get(url)
        .auth(token, { type: 'bearer' });

      expect(status).toBe(200);
      expect(body.success).toBeTruthy();
      expect(body.companies.length).toEqual(2);
      expect(body.companies).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ name: 'PayTsek' }),
          expect.objectContaining({ name: 'Fullsuite' }),
        ]),
      );
    });
  });
});
