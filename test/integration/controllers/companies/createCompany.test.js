const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../../../../app');
const Company = require('../../../../models/Company');

describe('POST /api/v1/companies/name - createCompany', () => {
  const url = '/api/v1/companies/name';
  let token;

  beforeEach(async () => {
    token = await global.signIn();
  });

  describe('Error response', () => {
    it('should return 401 unauthorized', async () => {
      const res = await request(app).post(url).send({ name: 'PayTsek' });

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'No token, access denied',
      });
    });

    it('should return 400 status code and error response if name is empty', async () => {
      const { status, body } = await request(app)
        .post(url)
        .auth(token, { type: 'bearer' })
        .send({ name: '' });

      expect(status).toBe(400);
      expect(body.success).toBeFalsy();
      expect(body.errors).toHaveProperty('name', 'Company name is required');
    });

    it('should return 400 status code and error response if name already exist', async () => {
      await Company.create({
        name: 'PayTsek',
        user: mongoose.Types.ObjectId().toHexString(),
      });
      const { status, body } = await request(app)
        .post(url)
        .auth(token, { type: 'bearer' })
        .send({ name: 'PayTsek' });

      expect(status).toBe(400);
      expect(body.success).toBeFalsy();
      expect(body.errors).toHaveProperty('message', 'Duplicate field value entered');
    });
  });

  describe('Success Response', () => {
    it('should return 201 status code and success response if name is valid', async () => {
      const res = await request(app)
        .post(url)
        .auth(token, { type: 'bearer' })
        .send({ name: 'PayTsek' });

      expect(res.status).toBe(201);
      expect(res.body.success).toBeTruthy();
      expect(res.body.company).toHaveProperty(
        '_id',
        res.body.company._id,
        'name',
        'PayTsek',
      );
    });

    it('should generate a slug when saving a company name', async () => {
      const { body } = await request(app)
        .post(url)
        .auth(token, { type: 'bearer' })
        .send({ name: 'Pay Tsek' });

      expect(body.company.slug).toMatch(/pay-tsek/);
    });
  });
});
