const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const request = require('supertest');

const app = require('../../../app');
const Company = require('../../../models/Company');
const Payrun = require('../../../models/Payrun');

describe('GET /api/v1/payruns - getPayruns', () => {
  const url = '/api/v1/payruns';

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

    it('should return error response if no administrator', async () => {
      const token = await global.signIn();
      const company = await Company.create({
        name: 'Full suite',
        user: mongoose.Types.ObjectId(),
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
      const company = await Company.create({
        name: 'Full suite',
        user: mongoose.Types.ObjectId(),
        administrators: [user._id],
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

  describe('Success response', () => {
    it('should return success response if company is set and values are valid', async () => {
      const token = await global.signIn();
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await Company.create({
        name: 'PayTsek',
        user: user._id,
        administrators: [user._id],
      });
      await Payrun.create([
        {
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
        },
        {
          startDate: '2021-01-16',
          endDate: '2021-01-30',
          status: 'draft',
          payoutDate: '2021-01-05',
          totalNetPay: 450000,
          special: false,
          displayBeforePayout: true,
          taxPayment: 'half',
          company: company._id,
          payrunItems: [mongoose.Types.ObjectId().toHexString()],
        },
      ]);

      const res = await request(app)
        .get(url)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBeTruthy();
      expect(res.body.payruns.length).toBe(2);
      expect(res.body.payruns).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ totalNetPay: 500000 }),
          expect.objectContaining({ totalNetPay: 450000 }),
        ]),
      );
    });
  });
});
