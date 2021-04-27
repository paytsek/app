const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const request = require('supertest');
const app = require('../../../../app');
const Company = require('../../../../models/Company');
const User = require('../../../../models/User');
const Employee = require('../../../../models/Employee');

describe('GET /api/v1/employees/:id - getEmployee', () => {
  const url = '/api/v1/employees';
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
          errors: expect.objectContaining({
            message: 'No token, access denied',
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

    it('should return 403 if logged in user is not an administrator', async () => {
      const user = await User.create({
        username: 'jane doe',
        email: 'janedoe@gmail.com',
        password: '123456',
        firstName: 'Jane',
        lastName: 'Doe',
      });

      const company = await Company.create({
        name: 'test company',
        user: user._id,
        administrators: [user._id],
      });

      const res = await request(app)
        .get(`${url}/${mongoose.Types.ObjectId().toHexString()}`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(403);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: "You don't have permission to access on this route",
      });
    });

    it('should return 400 if id is invalid or not found', async () => {
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await Company.create({
        name: 'Paytsek',
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
      expect(res.body.errors).toEqual(
        expect.objectContaining({
          message: `Resource with an id of ${invalidId} not found`,
        }),
      );
    });
  });

  describe('Success Response', () => {
    it('should return success response if id is valid', async () => {
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await Company.create({
        name: 'Full suite',
        user: user._id,
        administrators: [user._id],
      });
      const employee = await Employee.create({
        email: 'employee1@examle.com',
        firstName: 'Kayven',
        lastName: 'Rodrigo',
        birthDate: '1994-02-11',
        hireDate: '2020-03-09',
        resignationDate: '',
        gender: 'male',
        civilStatus: 'single',
        numberOfQualifiedDependents: 0,
        rdoCode: '',
        validId: 'Passport',
        validIdNumber: '12345678',
        placeOfIssue: 'Baguio City',
        registeredAddress: {
          street: '22p Marcoville',
          city: 'Baguio City',
          country: 'Philippines',
          zipCode: '2600',
        },
        permanentAddress: {
          street: 'Salt Lake',
          city: 'Utah',
          country: 'USA',
          zipCode: '3151',
        },
        bankingInformation: '1234145',
        department: mongoose.Types.ObjectId().toHexString(),
        position: 'Senior',
        workingDays: 22,
        workingHours: 8,
        sssNumber: '1958483758',
        phicNumber: '38480581',
        hdmfNumber: '483050105',
        sssLoanBalance: 2000,
        allowances: 3000,
        hdmfLoanBalance: 0,
        primaryEmployer: true,
        company: company._id,
      });

      const res = await request(app)
        .get(`${url}/${employee._id}`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBeTruthy();
      expect(res.body.employee).toEqual(
        expect.objectContaining({
          _id: employee._id.toString(),
          email: 'employee1@examle.com',
        }),
      );
    });
  });
});
