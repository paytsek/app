const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const request = require('supertest');

const app = require('../../../../app');
const Company = require('../../../../models/Company');
const Payrun = require('../../../../models/Payrun');

describe('GET /api/v1/payruns/:id - getPayrun', () => {
  const url = '/api/v1/payruns';
  let token;

  beforeEach(async () => {
    token = await global.signIn();
  });

  describe('Error response', () => {
    it('should return error response if not logged in', async () => {
      const res = await request(app).get(
        `${url}/${mongoose.Types.ObjectId().toHexString()}`,
      );

      expect(res.status).toBe(401);
      expect(res.body).toEqual(
        expect.objectContaining({
          success: false,
          errors: expect.objectContaining({ message: 'No token, access denied' }),
        }),
      );
    });

    it('should return error response if no administrator', async () => {
      const company = await Company.create({
        name: 'Full suite',
        user: mongoose.Types.ObjectId(),
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
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await Company.create({
        name: 'Full suite',
        user: mongoose.Types.ObjectId(),
        administrators: [user._id],
      });

      const res = await request(app)
        .get(`${url}/${mongoose.Types.ObjectId().toHexString()}`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(401);
      expect(res.body).toEqual(
        expect.objectContaining({
          success: false,
          errors: expect.objectContaining({
            message: 'Not authorized, access denied',
          }),
        }),
      );
    });

    it('should return error response if no company set', async () => {
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

    it('should return error response if id is not found or invalid', async () => {
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
      expect(res.body.success).toBeFalsy();
      expect(res.body).toEqual(
        expect.objectContaining({
          errors: expect.objectContaining({
            message: `Resource with an id of ${invalidId} not found`,
          }),
        }),
      );
    });
  });

  describe('Success Response', () => {
    it('should return success response if company is set and values are valid', async () => {
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await Company.create({
        name: 'Full suite',
        user: user._id,
        administrators: [user._id],
      });
      const payrun = await Payrun.create({
        startDate: '2021-01-01',
        endDate: '2021-01-15',
        status: 'approved',
        payoutDate: '2021-01-20',
        totalNetPay: 500000,
        special: false,
        displayBeforePayout: true,
        taxPayment: 'half',
        company: company._id,
        payrunItems: [mongoose.Types.ObjectId().toHexString()],
      });

      const res = await request(app)
        .get(`${url}/${payrun._id}`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBeTruthy();
      expect(res.body.payrun).toHaveProperty('_id', payrun._id.toString());
    });
  });
});
