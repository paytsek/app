const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const request = require('supertest');

const app = require('../../../../app');
const Company = require('../../../../models/Company');
const Payrun = require('../../../../models/Payrun');

describe('PUT /api/v1/payruns/:id - updatePayrun', () => {
  const url = '/api/v1/payruns';
  let token;

  beforeEach(async () => {
    token = await global.signIn();
  });

  describe('Error Response', () => {
    it('should return error response if not logged in', async () => {
      const res = await request(app).put(
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
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await Company.create({
        name: 'Full suite',
        user: mongoose.Types.ObjectId(),
        administrators: [user._id],
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

    it('should return error response if values are invalid', async () => {
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await Company.create({
        name: 'Full suite',
        user: user._id,
        administrators: [user._id],
      });
      const payrun = await Payrun.create({
        startDate: '2021-01-01',
        endDate: '2021-01-15',
        company: company._id,
      });

      const res = await request(app)
        .put(`${url}/${payrun._id}`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' })
        .send({
          startDate: '',
          endDate: '',
          displayBeforePayout: false,
          taxPayment: 'Test',
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBeFalsy();
      expect(res.body).toEqual(
        expect.objectContaining({
          errors: expect.objectContaining({
            taxPayment: '`Test` is not a valid enum value for path `taxPayment`.',
            payoutDate: 'Payout Date is required',
            endDate: 'End Date is required',
            startDate: 'Start Date is required',
          }),
        }),
      );
    });
  });

  describe('Success Response', () => {
    it('should return success response if values are valid', async () => {
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await Company.create({
        name: 'Full suite',
        user: user._id,
        administrators: [user._id],
      });
      const payrun = await Payrun.create({
        startDate: '2021-01-01',
        endDate: '2021-01-15',
        company: company._id,
      });

      const res = await request(app)
        .put(`${url}/${payrun._id}`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' })
        .send({
          startDate: '2021-01-02',
          endDate: '2021-01-16',
          payoutDate: '2021-01-21',
          displayBeforePayout: false,
          taxPayment: 'none',
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBeTruthy();
      expect(res.body).toEqual(
        expect.objectContaining({
          payrun: expect.objectContaining({
            _id: payrun._id.toString(),
            status: 'draft',
            special: false,
            displayBeforePayout: false,
            taxPayment: 'none',
            startDate: '2021-01-02T00:00:00.000Z',
            endDate: '2021-01-16T00:00:00.000Z',
            company: company._id.toString(),
            payoutDate: '2021-01-21T00:00:00.000Z',
          }),
        }),
      );
    });
  });
});
