const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const request = require('supertest');
const app = require('../../../../app');
const Company = require('../../../../models/Company');
const NonTaxablePay = require('../../../../models/NonTaxablePay');

describe('GET /api/v1/nonTaxablePays - getNonTaxablePays', () => {
  const url = '/api/v1/nonTaxablePays';
  let token;

  beforeEach(async () => {
    token = await global.signIn();
  });

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
