const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const request = require('supertest');
const app = require('../../../app');
const Company = require('../../../models/Company');
const NonTaxablePay = require('../../../models/NonTaxablePay');

describe('GET /api/v1/nonTaxablePays - getNonTaxablePays', () => {
  const url = '/api/v1/nonTaxablePays';

  describe('Error response', () => {
    it('should return error response if not logged in', async () => {
      const res = await request(app).get(url);

      expect(res.status).toBe(401);
      expect(res.body).toEqual(
        expect.objectContaining({
          success: false,
          errors: expect.objectContaining({ message: 'No token, access denied' }),
        }),
      );
    });

    it('should return error response if not an administrator', async () => {
      const token = await global.signIn();
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const userId = mongoose.Types.ObjectId().toHexString();
      const company = await Company.create({
        name: 'Full suite',
        user: user._id,
        administrators: [userId],
      });

      const res = await request(app)
        .get(url)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

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

    it('should return error response if logged in user is not equal to company user', async () => {
      const token = await global.signIn();
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const userId = mongoose.Types.ObjectId().toHexString();
      const company = await Company.create({
        name: 'Full suite',
        user: userId,
        administrators: [userId, user._id],
      });

      const res = await request(app)
        .get(url)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(401);
      expect(res.body).toEqual(
        expect.objectContaining({
          success: false,
          errors: expect.objectContaining({ message: 'Not authorized, access denied' }),
        }),
      );
    });

    it('should return error response if no company set', async () => {
      const token = await global.signIn();

      const res = await request(app).get(url).auth(token, { type: 'bearer' });

      expect(res.status).toBe(401);
      expect(res.body).toEqual(
        expect.objectContaining({
          success: false,
          errors: expect.objectContaining({ message: 'No tenant, access denied' }),
        }),
      );
    });
  });

  describe('Success Response', () => {
    it('should return a success response if values are valid', async () => {
      const token = await global.signIn();
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await Company.create({
        name: 'PayTsek',
        user: user._id,
        administrators: [user._id],
      });
      await NonTaxablePay.create({ name: 'Transportation', company: company._id });

      const res = await request(app)
        .get(url)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBeTruthy();
      expect(res.body).toEqual(
        expect.objectContaining({
          nonTaxablePays: expect.arrayContaining([
            expect.objectContaining({ name: 'Transportation' }),
          ]),
        }),
      );
    });
  });
});

describe('GET /api/v1/nonTaxablePays/:id - getNonTaxablePay', () => {
  const url = '/api/v1/nonTaxablePays';

  describe('Error response', () => {
    it('should return error response if not logged in', async () => {
      const res = await request(app).get(`${url}/${mongoose.Types.ObjectId().toHexString()}`);

      expect(res.status).toBe(401);
      expect(res.body).toEqual(
        expect.objectContaining({
          success: false,
          errors: expect.objectContaining({ message: 'No token, access denied' }),
        }),
      );
    });

    it('should return error response if not an administrator', async () => {
      const token = await global.signIn();
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const userId = mongoose.Types.ObjectId().toHexString();
      const company = await Company.create({
        name: 'Full suite',
        user: user._id,
        administrators: [userId],
      });

      const res = await request(app)
        .get(`${url}/${mongoose.Types.ObjectId().toHexString()}`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

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

    it('should return error response if logged in user is not equal to company user', async () => {
      const token = await global.signIn();
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const userId = mongoose.Types.ObjectId().toHexString();
      const company = await Company.create({
        name: 'Full suite',
        user: userId,
        administrators: [userId, user._id],
      });

      const res = await request(app)
        .get(`${url}/${mongoose.Types.ObjectId().toHexString()}`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(401);
      expect(res.body).toEqual(
        expect.objectContaining({
          success: false,
          errors: expect.objectContaining({ message: 'Not authorized, access denied' }),
        }),
      );
    });

    it('should return error response if no company set', async () => {
      const token = await global.signIn();

      const res = await request(app)
        .get(`${url}/${mongoose.Types.ObjectId().toHexString()}`)
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(401);
      expect(res.body).toEqual(
        expect.objectContaining({
          success: false,
          errors: expect.objectContaining({ message: 'No tenant, access denied' }),
        }),
      );
    });

    it('should return error response if params id is invalid or not found', async () => {
      const token = await global.signIn();
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await Company.create({
        name: 'Full suite',
        user: user._id,
        administrators: [user._id],
      });
      const invalidId = mongoose.Types.ObjectId().toHexString();

      const res = await request(app)
        .get(`${url}/${invalidId}`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(404);
      expect(res.body).toEqual(
        expect.objectContaining({
          success: false,
          errors: expect.objectContaining({
            message: `Resource with an id of ${invalidId} not found`,
          }),
        }),
      );
    });
  });

  describe('Success response', () => {
    it('should return success response of valid id params passed', async () => {
      const token = await global.signIn();
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await Company.create({
        name: 'Full suite',
        user: user._id,
        administrators: [user._id],
      });
      const taxablePay = await NonTaxablePay.create({ name: 'Transportation', company: company._id });

      const res = await request(app)
        .get(`${url}/${taxablePay._id}`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBeTruthy();
      expect(res.body).toEqual(
        expect.objectContaining({
          nonTaxablePay: expect.objectContaining({
            name: 'Transportation',
          }),
        }),
      );
    });
  });
});

describe('POST /api/v1/nonTaxablePays - createNonTaxablePay', () => {
  const url = '/api/v1/nonTaxablePays';

  describe('Error response', () => {
    it('should return error response if not logged in', async () => {
      const res = await request(app).post(url);

      expect(res.status).toBe(401);
      expect(res.body).toEqual(
        expect.objectContaining({
          success: false,
          errors: expect.objectContaining({ message: 'No token, access denied' }),
        }),
      );
    });

    it('should return error response if not an administrator', async () => {
      const token = await global.signIn();
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const userId = mongoose.Types.ObjectId().toHexString();
      const company = await Company.create({
        name: 'Full suite',
        user: user._id,
        administrators: [userId],
      });

      const res = await request(app)
        .post(url)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

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

    it('should return error response if logged in user is not equal to company user', async () => {
      const token = await global.signIn();
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const userId = mongoose.Types.ObjectId().toHexString();
      const company = await Company.create({
        name: 'Full suite',
        user: userId,
        administrators: [userId, user._id],
      });

      const res = await request(app)
        .post(url)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(401);
      expect(res.body).toEqual(
        expect.objectContaining({
          success: false,
          errors: expect.objectContaining({ message: 'Not authorized, access denied' }),
        }),
      );
    });

    it('should return error response if no company set', async () => {
      const token = await global.signIn();

      const res = await request(app).post(url).auth(token, { type: 'bearer' });

      expect(res.status).toBe(401);
      expect(res.body).toEqual(
        expect.objectContaining({
          success: false,
          errors: expect.objectContaining({ message: 'No tenant, access denied' }),
        }),
      );
    });

    it('should return error response if values are not valid', async () => {
      const token = await global.signIn();
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await Company.create({
        name: 'Full suite',
        user: user._id,
        administrators: [user._id],
      });

      const res = await request(app)
        .post(url)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' })
        .send({ name: '' });

      expect(res.status).toBe(400);
      expect(res.body.success).toBeFalsy();
      expect(res.body).toEqual(
        expect.objectContaining({
          errors: expect.objectContaining({ name: 'Please add a non taxable' }),
        }),
      );
    });
  });

  describe('Success response', () => {
    it('should return succes response if values are valid', async () => {
      const token = await global.signIn();
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await Company.create({
        name: 'Full suite',
        user: user._id,
        administrators: [user._id],
      });

      const res = await request(app)
        .post(url)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' })
        .send({ name: 'Transportation' });

      expect(res.status).toBe(201);
      expect(res.body.success).toBeTruthy();
      expect(res.body).toEqual(
        expect.objectContaining({
          nonTaxablePay: expect.objectContaining({ name: 'Transportation' }),
        }),
      );
    });
  });
});

describe('PUT /api/v1/nonTaxablePays/:id', () => {
  const url = '/api/v1/nonTaxablePays';

  describe('Error response', () => {
    it('should return error response if not logged in', async () => {
      const res = await request(app).put(`${url}/${mongoose.Types.ObjectId().toHexString()}`);

      expect(res.status).toBe(401);
      expect(res.body).toEqual(
        expect.objectContaining({
          success: false,
          errors: expect.objectContaining({ message: 'No token, access denied' }),
        }),
      );
    });

    it('should return error response if not an administrator', async () => {
      const token = await global.signIn();
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const userId = mongoose.Types.ObjectId().toHexString();
      const company = await Company.create({
        name: 'Full suite',
        user: user._id,
        administrators: [userId],
      });

      const res = await request(app)
        .put(`${url}/${mongoose.Types.ObjectId().toHexString()}`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

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

    it('should return error response if logged in user is not equal to company user', async () => {
      const token = await global.signIn();
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const userId = mongoose.Types.ObjectId().toHexString();
      const company = await Company.create({
        name: 'Full suite',
        user: userId,
        administrators: [userId, user._id],
      });

      const res = await request(app)
        .put(`${url}/${mongoose.Types.ObjectId().toHexString()}`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(401);
      expect(res.body).toEqual(
        expect.objectContaining({
          success: false,
          errors: expect.objectContaining({ message: 'Not authorized, access denied' }),
        }),
      );
    });

    it('should return error response if no company set', async () => {
      const token = await global.signIn();

      const res = await request(app)
        .put(`${url}/${mongoose.Types.ObjectId().toHexString()}`)
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(401);
      expect(res.body).toEqual(
        expect.objectContaining({
          success: false,
          errors: expect.objectContaining({ message: 'No tenant, access denied' }),
        }),
      );
    });

    it('should return error response if params id is invalid or not found', async () => {
      const token = await global.signIn();
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await Company.create({
        name: 'Full suite',
        user: user._id,
        administrators: [user._id],
      });
      const invalidId = mongoose.Types.ObjectId().toHexString();

      const res = await request(app)
        .put(`${url}/${invalidId}`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(404);
      expect(res.body).toEqual(
        expect.objectContaining({
          success: false,
          errors: expect.objectContaining({
            message: `Resource with an id of ${invalidId} not found`,
          }),
        }),
      );
    });

    it('should return error response if values are not valid', async () => {
      const token = await global.signIn();
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await Company.create({
        name: 'Full suite',
        user: user._id,
        administrators: [user._id],
      });
      const nonTaxablePay = await NonTaxablePay.create({ name: 'Transportation', company: company._id });

      const res = await request(app)
        .put(`${url}/${nonTaxablePay._id}`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' })
        .send({ name: '' });

      expect(res.status).toBe(400);
      expect(res.body.success).toBeFalsy();
      expect(res.body).toEqual(
        expect.objectContaining({
          errors: expect.objectContaining({ name: 'Please add a non taxable' }),
        }),
      );
    });
  });

  describe('Success response', () => {
    it('should return success response if values are valid', async () => {
      const token = await global.signIn();
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await Company.create({
        name: 'Full suite',
        user: user._id,
        administrators: [user._id],
      });
      const nonTaxablePay = await NonTaxablePay.create({ name: 'Transportation', company: company._id });

      const res = await request(app)
        .put(`${url}/${nonTaxablePay._id}`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' })
        .send({ name: 'Allowance' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBeTruthy();
      expect(res.body).toEqual(
        expect.objectContaining({
          nonTaxablePay: expect.objectContaining({ name: 'Allowance' }),
        }),
      );
    });
  });
});

describe('DELETE /api/v1/nonTaxablePays/:id', () => {
  const url = '/api/v1/nonTaxablePays';

  describe('Error response', () => {
    it('should return error response if not logged in', async () => {
      const res = await request(app).delete(`${url}/${mongoose.Types.ObjectId().toHexString()}`);

      expect(res.status).toBe(401);
      expect(res.body).toEqual(
        expect.objectContaining({
          success: false,
          errors: expect.objectContaining({ message: 'No token, access denied' }),
        }),
      );
    });

    it('should return error response if not an administrator', async () => {
      const token = await global.signIn();
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const userId = mongoose.Types.ObjectId().toHexString();
      const company = await Company.create({
        name: 'Full suite',
        user: user._id,
        administrators: [userId],
      });

      const res = await request(app)
        .delete(`${url}/${mongoose.Types.ObjectId().toHexString()}`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

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

    it('should return error response if logged in user is not equal to company user', async () => {
      const token = await global.signIn();
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const userId = mongoose.Types.ObjectId().toHexString();
      const company = await Company.create({
        name: 'Full suite',
        user: userId,
        administrators: [userId, user._id],
      });

      const res = await request(app)
        .delete(`${url}/${mongoose.Types.ObjectId().toHexString()}`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(401);
      expect(res.body).toEqual(
        expect.objectContaining({
          success: false,
          errors: expect.objectContaining({ message: 'Not authorized, access denied' }),
        }),
      );
    });

    it('should return error response if no company set', async () => {
      const token = await global.signIn();

      const res = await request(app)
        .delete(`${url}/${mongoose.Types.ObjectId().toHexString()}`)
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(401);
      expect(res.body).toEqual(
        expect.objectContaining({
          success: false,
          errors: expect.objectContaining({ message: 'No tenant, access denied' }),
        }),
      );
    });

    it('should return error response if params id is invalid or not found', async () => {
      const token = await global.signIn();
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await Company.create({
        name: 'Full suite',
        user: user._id,
        administrators: [user._id],
      });
      const invalidId = mongoose.Types.ObjectId().toHexString();

      const res = await request(app)
        .delete(`${url}/${invalidId}`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(404);
      expect(res.body).toEqual(
        expect.objectContaining({
          success: false,
          errors: expect.objectContaining({
            message: `Resource with an id of ${invalidId} not found`,
          }),
        }),
      );
    });
  });

  describe('Success response', () => {
    it('should return success response if id is valid', async () => {
      const token = await global.signIn();
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await Company.create({
        name: 'Full suite',
        user: user._id,
        administrators: [user._id],
      });
      const nonTaxablePay = await NonTaxablePay.create({ name: 'Transportation', company: company._id });

      const res = await request(app)
        .delete(`${url}/${nonTaxablePay._id}`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' })
        .send({ name: 'Allowance' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBeTruthy();
      expect(res.body).toEqual(
        expect.objectContaining({
          nonTaxablePay: {},
          message: `Non Taxable pay - ID:${nonTaxablePay._id.toString()} successfully deleted`,
        }),
      );
    });
  });
});
