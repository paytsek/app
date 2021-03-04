const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const request = require('supertest');
const app = require('../../../app');
const Company = require('../../../models/Company');
const User = require('../../../models/User');
const Employee = require('../../../models/Employee');

describe('GET /api/v1/employees = getEmployees', () => {
  const url = '/api/v1/employees';

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

    it('should return 403 if logged in user is not an administrator', async () => {
      const token = await global.signIn();

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
        .get(url)
        .set({ 'x-company-tenant': company.slug })
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
      const token = await global.signIn();
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await Company.create({
        name: 'Full suite',
        user: user._id,
        administrators: [user._id],
      });
      await Employee.create([
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
          department: mongoose.Types.ObjectId(),
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
          department: mongoose.Types.ObjectId(),
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
        .set({ 'x-company-tenant': company.slug })
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

describe('POST /api/v1/employees - createEmployee', () => {
  const url = '/api/v1/employees';

  describe('Error Response', () => {
    it('should return error response if not logged in', async () => {
      const res = await request(app).post(url);

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
      const token = await global.signIn();
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await Company.create({
        name: 'Full suite',
        user: mongoose.Types.ObjectId(),
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

    it('should return 403 if logged in user is not an administrator', async () => {
      const token = await global.signIn();

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
        .post(url)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(403);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: "You don't have permission to access on this route",
      });
    });

    it('should return validation error if values are invalid', async () => {
      const token = await global.signIn();
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await Company.create({
        name: 'Paytsek',
        user: user._id,
        administrators: [user._id],
      });

      let res = await request(app)
        .post(url)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(400);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toEqual(
        expect.objectContaining({
          'permanentAddress.zipCode': 'Zip code is required',
          'permanentAddress.country': 'City is required',
          'permanentAddress.city': 'City is required',
          'permanentAddress.street': 'Street is required',
          'registeredAddress.zipCode': 'Zip code is required',
          'registeredAddress.country': 'City is required',
          'registeredAddress.city': 'City is required',
          'registeredAddress.street': 'Street is required',
          lastName: 'Please provide last name',
          firstName: 'Please provide first name',
        }),
      );

      res = await request(app)
        .post(url)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' })
        .send({
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
          nightDifferential: true,
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
          department: mongoose.Types.ObjectId(),
          position: 'Senior',
          workingDays: 22,
          workingHours: 8,
          sssNumber: '1958483758',
          phicNumber: '38480581',
          hdmfNumber: '483050105',
          sssLoanBalance: 2000,
          allowances: 3000,
          hdmfLoanBalance: 0,
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toEqual(
        expect.objectContaining({
          compensation: 'Compensation is required',
        }),
      );

      await Employee.create({
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
        department: mongoose.Types.ObjectId(),
        position: 'Senior',
        workingDays: 22,
        workingHours: 8,
        sssNumber: '1958483758',
        phicNumber: '38480581',
        hdmfNumber: '483050105',
        sssLoanBalance: 2000,
        allowances: 3000,
        hdmfLoanBalance: 0,
        status: {
          active: true,
        },
        compensation: {
          basicPay: 30000,
        },
        company: company._id,
      });

      res = await request(app)
        .post(url)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' })
        .send({
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
          department: mongoose.Types.ObjectId(),
          position: 'Senior',
          workingDays: 22,
          workingHours: 8,
          sssNumber: '1958483758',
          phicNumber: '38480581',
          hdmfNumber: '483050105',
          sssLoanBalance: 2000,
          allowances: 3000,
          hdmfLoanBalance: 0,
          status: {
            active: true,
          },
          compensation: {
            basicPay: 30000,
          },
          company: company._id,
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toEqual(
        expect.objectContaining({
          email: 'Email already exist',
        }),
      );
    });
  });

  describe('Success Response', () => {
    it('should return success response if values entered are valid', async () => {
      await mongoose.connection.createCollection('othertaxablepays');
      await mongoose.connection.createCollection('othernontaxablepays');
      await mongoose.connection.createCollection('status');
      await mongoose.connection.createCollection('compensations');
      await mongoose.connection.createCollection('taxablepays');
      await mongoose.connection.createCollection('nontaxablepays');

      const token = await global.signIn();
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await Company.create({
        name: 'Paytsek',
        user: user._id,
        administrators: [user._id],
      });

      const res = await request(app)
        .post(url)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' })
        .send({
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
          nightDifferential: true,
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
          department: mongoose.Types.ObjectId(),
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
          status: {
            active: true,
          },
          compensation: {
            basicPay: 40000,
            deminimis: 2000,
            effectivityDate: '2020-09-09',
            otherTaxablePays: [{ taxablePay: mongoose.Types.ObjectId(), value: 1200 }],
            otherNonTaxablePays: [
              { nonTaxablePay: mongoose.Types.ObjectId(), value: 1200 },
            ],
          },
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBeTruthy();
      expect(Object.keys(res.body.employee)).toEqual(expect.arrayContaining(['_id']));
    });
  });
});

describe('GET /api/v1/employees/:id - getEmployee', () => {
  const url = '/api/v1/employees';

  describe('Error response', () => {
    it('should return error response if not logged in', async () => {
      const res = await request(app).get(`${url}/${mongoose.Types.ObjectId()}`);

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
      const token = await global.signIn();
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await Company.create({
        name: 'Full suite',
        user: mongoose.Types.ObjectId(),
        administrators: [user._id],
      });

      const res = await request(app)
        .get(`${url}/${mongoose.Types.ObjectId()}`)
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
        .get(`${url}/${mongoose.Types.ObjectId()}`)
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
      const token = await global.signIn();

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
        .get(`${url}/${mongoose.Types.ObjectId()}`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(403);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: "You don't have permission to access on this route",
      });
    });

    it('should return 400 if id is invalid or not found', async () => {
      const token = await global.signIn();
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await Company.create({
        name: 'Paytsek',
        user: user._id,
        administrators: [user._id],
      });

      const invalidId = mongoose.Types.ObjectId();

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
      const token = await global.signIn();
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
        department: mongoose.Types.ObjectId(),
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

describe('DELETE /api/v1/employees/:id - deleteEmployee', () => {
  const url = '/api/v1/employees';
  describe('Error response', () => {
    it('should return error response if not logged in', async () => {
      const res = await request(app).delete(`${url}/${mongoose.Types.ObjectId()}`);

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
      const token = await global.signIn();
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await Company.create({
        name: 'Full suite',
        user: mongoose.Types.ObjectId(),
        administrators: [user._id],
      });

      const res = await request(app)
        .delete(`${url}/${mongoose.Types.ObjectId()}`)
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
        .delete(`${url}/${mongoose.Types.ObjectId()}`)
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
      const token = await global.signIn();

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
        .delete(`${url}/${mongoose.Types.ObjectId()}`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(403);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: "You don't have permission to access on this route",
      });
    });

    it('should return 400 if id is invalid or not found', async () => {
      const token = await global.signIn();
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await Company.create({
        name: 'Paytsek',
        user: user._id,
        administrators: [user._id],
      });

      const invalidId = mongoose.Types.ObjectId();

      const res = await request(app)
        .delete(`${url}/${invalidId}`)
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
      const token = await global.signIn();
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
        department: mongoose.Types.ObjectId(),
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
        .delete(`${url}/${employee._id}`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBeTruthy();
      expect(res.body).toEqual(
        expect.objectContaining({
          employee: {},
          message: `Employee - ID:${employee._id} successfully deleted`,
        }),
      );
    });
  });
});

describe('PUT /api/v1/employees/:id - updateEmployee', () => {
  const url = '/api/v1/employees';
  describe('Error response', () => {
    it('should return error response if not logged in', async () => {
      const res = await request(app).put(`${url}/${mongoose.Types.ObjectId()}`);

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
      const token = await global.signIn();
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await Company.create({
        name: 'Full suite',
        user: mongoose.Types.ObjectId(),
        administrators: [user._id],
      });

      const res = await request(app)
        .put(`${url}/${mongoose.Types.ObjectId()}`)
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
        .put(`${url}/${mongoose.Types.ObjectId()}`)
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
      const token = await global.signIn();

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
        .put(`${url}/${mongoose.Types.ObjectId()}`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(403);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: "You don't have permission to access on this route",
      });
    });

    it('should return 404 if id is invalid or not found', async () => {
      const token = await global.signIn();
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await Company.create({
        name: 'Paytsek',
        user: user._id,
        administrators: [user._id],
      });

      const invalidId = mongoose.Types.ObjectId();

      const res = await request(app)
        .put(`${url}/${invalidId}`)
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

    it('should return 400 if values entered are invalid', async () => {
      const token = await global.signIn();
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await Company.create({
        name: 'Paytsek',
        user: user._id,
        administrators: [user._id],
      });
      await Employee.create({
        email: 'employee2@examle.com',
        employeeNumber: 'sample-001',
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
        department: mongoose.Types.ObjectId(),
        position: 'Senior',
        workingDays: 22,
        workingHours: 8,
        sssNumber: '1958483758',
        phicNumber: '38480581',
        hdmfNumber: '483050105',
        sssLoanBalance: 2000,
        allowances: 3000,
        hdmfLoanBalance: 0,
        status: {
          active: true,
        },
        compensation: {
          basicPay: 30000,
        },
        company: company._id,
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
        department: mongoose.Types.ObjectId(),
        position: 'Senior',
        workingDays: 22,
        workingHours: 8,
        sssNumber: '1958483758',
        phicNumber: '38480581',
        hdmfNumber: '483050105',
        sssLoanBalance: 2000,
        allowances: 3000,
        hdmfLoanBalance: 0,
        status: {
          active: true,
        },
        compensation: {
          basicPay: 30000,
        },
        company: company._id,
      });

      const res = await request(app)
        .put(`${url}/${employee._id}`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' })
        .send({ email: 'employee2@examle.com', employeeNumber: 'sample-001' });

      expect(res.status).toBe(400);
      expect(res.body.success).toBeFalsy();
      expect(res.body).toEqual(
        expect.objectContaining({
          errors: expect.objectContaining({
            email: 'Email already exist',
            employeeNumber: 'Employee Number already exist',
          }),
        }),
      );
    });
  });

  describe('Success response', () => {
    it('should return success response if values are valid', async () => {
      const token = await global.signIn();
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await Company.create({
        name: 'Paytsek',
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
        department: mongoose.Types.ObjectId(),
        position: 'Senior',
        workingDays: 22,
        workingHours: 8,
        sssNumber: '1958483758',
        phicNumber: '38480581',
        hdmfNumber: '483050105',
        sssLoanBalance: 2000,
        allowances: 3000,
        hdmfLoanBalance: 0,
        company: company._id,
      });

      const res = await request(app)
        .put(`${url}/${employee._id}`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' })
        .send({
          email: 'employee1@update.com',
          employeeNumber: 'sample-0001',
          firstName: 'Kayven Carlos',
          lastName: 'Rodrigo',
          birthDate: '1994-02-11',
          hireDate: '2020-12-09',
          resignationDate: '',
          gender: 'female',
          civilStatus: 'married',
          numberOfQualifiedDependents: 2,
          rdoCode: '',
          validId: 'Passport',
          validIdNumber: '12345678',
          placeOfIssue: 'Baguio City',
          registeredAddress: {
            street: '22c Marcoville',
            city: 'Baguio City',
            country: 'Philippines',
            zipCode: '2600',
          },
          permanentAddress: {
            street: ' 34 St, Salt Lake',
            city: 'Utah',
            country: 'USA',
            zipCode: '3151',
          },
          bankingInformation: '1234145',
          position: 'Senior',
          workingDays: 22,
          workingHours: 8,
          sssNumber: '1958483758',
          phicNumber: '38480581',
          hdmfNumber: '483050105',
          sssLoanBalance: 2000,
          allowances: 3000,
          hdmfLoanBalance: 0,
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBeTruthy();
      expect(res.body.employee).toEqual(
        expect.objectContaining({
          email: 'employee1@update.com',
          employeeNumber: 'sample-0001',
          gender: 'female',
          civilStatus: 'married',
          numberOfQualifiedDependents: 2,
          rdoCode: '',
          validId: 'Passport',
          validIdNumber: '12345678',
          placeOfIssue: 'Baguio City',
          registeredAddress: {
            street: '22c Marcoville',
            city: 'Baguio City',
            country: 'Philippines',
            zipCode: '2600',
          },
          permanentAddress: {
            street: ' 34 St, Salt Lake',
            city: 'Utah',
            country: 'USA',
            zipCode: '3151',
          },
          bankingInformation: '1234145',
          position: 'Senior',
          workingDays: 22,
          workingHours: 8,
          sssNumber: '1958483758',
          phicNumber: '38480581',
          hdmfNumber: '483050105',
          sssLoanBalance: 2000,
          allowances: 3000,
          hdmfLoanBalance: 0,
        }),
      );
    });
  });
});
