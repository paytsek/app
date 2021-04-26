const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const request = require('supertest');
const app = require('../../../../app');
const TestUtils = require('../../../../utils/testUtils');

describe('GET /api/v1/employees = getEmployees', () => {
  const url = '/api/v1/employees';
  let token;

  beforeEach(async () => {
    token = await global.signIn();
  });

  describe('Error Response', () => {
    it('should return error response if not logged in', async () => {
      const res = await request(app).get(url);

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
      const company = await TestUtils.createCompany({
        name: 'Full suite',
        user: mongoose.Types.ObjectId().toHexString(),
        administrators: [user._id],
      });

      const res = await request(app)
        .get(url)
        .set(TestUtils.responseSetObject(company.slug))
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

    it('should return 403 if logged in user is not an administrator', async () => {
      const user = await TestUtils.createUser({
        username: 'jane doe',
        email: 'janedoe@gmail.com',
        password: '123456',
        firstName: 'Jane',
        lastName: 'Doe',
      });

      const company = await TestUtils.createCompany({
        name: 'test company',
        user: user._id,
        administrators: [user._id],
      });

      const res = await request(app)
        .get(url)
        .set(TestUtils.responseSetObject(company.slug))
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(403);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: "You don't have permission to access on this route",
      });
    });
  });

  describe('Success Response', () => {
    it('should return success response if values are valid', async () => {
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await TestUtils.createCompany({
        name: 'Full suite',
        user: user._id,
        administrators: [user._id],
      });
      await TestUtils.createEmployee([
        {
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
        },
        {
          email: 'employee2@examle.com',
          firstName: 'Racee',
          lastName: 'Rodrigo',
          birthDate: '1994-02-11',
          hireDate: '2020-03-09',
          resignationDate: '',
          gender: 'female',
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
        },
      ]);

      const res = await request(app)
        .get(url)
        .set(TestUtils.responseSetObject(company.slug))
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBeTruthy();
      expect(res.body.employees).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            email: 'employee1@examle.com',
          }),
          expect.objectContaining({
            email: 'employee2@examle.com',
          }),
        ]),
      );
    });
  });
});
