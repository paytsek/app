const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const request = require('supertest');

const app = require('../../../../app');
const Company = require('../../../../models/Company');

describe('POST /api/v1/payruns - createPayrun', () => {
  const url = '/api/v1/payruns';
  let token;

  beforeEach(async () => {
    token = await global.signIn();
  });

  describe('Error Response', () => {
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

    it('should return error response if no administrator', async () => {
      const company = await Company.create({
        name: 'Full suite',
        user: mongoose.Types.ObjectId().toHexString(),
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
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await Company.create({
        name: 'Full suite',
        user: mongoose.Types.ObjectId().toHexString(),
        administrators: [user._id],
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
      const res = await request(app).post(url).auth(token, { type: 'bearer' });

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

      const res = await request(app)
        .post(url)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' })
        .send({ startDate: '', endDate: '' });

      expect(res.status).toBe(400);
      expect(res.body.success).toBeFalsy();
      expect(res.body).toEqual(
        expect.objectContaining({
          errors: expect.objectContaining({
            startDate: 'Start Date is required',
            endDate: 'End Date is required',
          }),
        }),
      );
    });
  });

  describe('Success Response', () => {
    it('should return a success response if values are valid', async () => {
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
        .send({ startDate: '2021-01-01', endDate: '2021-01-15' });

      expect(res.status).toBe(201);
      expect(res.body.success).toBeTruthy();
      expect(res.body).toEqual(
        expect.objectContaining({
          payrun: expect.objectContaining({
            startDate: '2021-01-01T00:00:00.000Z',
            endDate: '2021-01-15T00:00:00.000Z',
          }),
        }),
      );
      expect(Object.keys(res.body.payrun)).toEqual(expect.arrayContaining(['_id']));
    });
  });
});
