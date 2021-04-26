const mongoose = require('mongoose');
const request = require('supertest');
const jwt = require('jsonwebtoken');

const app = require('../../../../app');
const User = require('../../../../models/User');
const Company = require('../../../../models/Company');

describe('PUT /api/v1/companies/name/:id - updateCompanyName', () => {
  const url = '/api/v1/companies/name';
  let token;

  beforeEach(async () => {
    token = await global.signIn();
  });

  describe('Error Response', () => {
    it('should return error response not logged in', async () => {
      const res = await request(app).put(
        `${url}/${mongoose.Types.ObjectId().toHexString()}`,
      );

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'No token, access denied',
      });
    });

    it('should return error response if id params is invalid or not found', async () => {
      const id = mongoose.Types.ObjectId().toHexString();

      const res = await request(app).put(`${url}/${id}`).auth(token, { type: 'bearer' });

      expect(res.status).toBe(404);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: `Resource with an id of ${id} not found`,
      });
    });

    it('should return error response if logged in user not own the company', async () => {
      const user = await User.create({
        username: 'rodrigo',
        email: 'rodrigo@gmail.com',
        password: '123456',
        firstName: 'Rodrigo',
        lastName: 'Carlos',
      });
      const company = await Company.create({
        name: 'Sample Company',
        user: user._id,
      });

      const res = await request(app)
        .put(`${url}/${company._id}`)
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'Not authorize to access this route',
      });
    });

    it('should return error response if name entered already exist', async () => {
      const user = await User.create({
        username: 'rodrigocarlos',
        email: 'rodrigo@gmail.com',
        password: '123456',
        firstName: 'Rodrigo',
        lastName: 'Carlos',
      });
      await Company.create({ name: 'PayTsek', user: user._id });

      const loggedInUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await Company.create({
        name: 'Sample Company',
        user: loggedInUser._id,
      });
      const res = await request(app)
        .put(`${url}/${company._id}`)
        .auth(token, { type: 'bearer' })
        .send({ name: 'paytsek' });

      expect(res.status).toBe(400);
      expect(res.status.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'Duplicate field value entered',
      });
    });
  });

  describe('Success Response', () => {
    it('should return success response if values entered are valid', async () => {
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await Company.create({ name: 'PayTsek', user: user._id });
      const res = await request(app)
        .put(`${url}/${company._id}`)
        .auth(token, { type: 'bearer' })
        .send({ name: 'Full suite' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBeTruthy();
      expect(res.body.company).toEqual(
        expect.objectContaining({ name: 'Full suite' }),
        expect.objectContaining({ slug: 'full-suite' }),
        expect.objectContaining({ _id: company._id }),
        expect.objectContaining({ user: user._id }),
      );
    });
  });
});
