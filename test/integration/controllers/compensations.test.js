const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const request = require('supertest');
const app = require('../../../app');
const Company = require('../../../models/Company');
const User = require('../../../models/User');
const Employee = require('../../../models/Employee');
const Compensation = require('../../../models/Compensation');

describe('GET /api/v1/employees/:employeeId/compensations', () => {
  let employee;
  let company;
  let token;
  let user;

  beforeEach(async () => {
    token = await global.signIn();
    user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    company = await Company.create({
      name: 'Full suite',
      user: user._id,
      administrators: [user._id],
    });
    [employee] = await Employee.create(
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
    );
  });

  const url = '/api/v1/employees';

  describe('Error response', () => {
    it('should return error response if not logged in', async () => {
      const res = await request(app).get(`${url}/${employee._id}/compensations`);

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
      company = await Company.create({
        name: 'PayTsek',
        user: mongoose.Types.ObjectId(),
        administrators: [user._id],
      });

      const res = await request(app)
        .get(`${url}/${employee._id}/compensations`)
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
        .get(`${url}/${employee._id}/compensations`)
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
      user = await User.create({
        username: 'jane doe',
        email: 'janedoe@gmail.com',
        password: '123456',
        firstName: 'Jane',
        lastName: 'Doe',
      });

      company = await Company.create({
        name: 'test company',
        user: user._id,
        administrators: [user._id],
      });

      const res = await request(app)
        .get(`${url}/${employee._id}/compensations`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(403);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: "You don't have permission to access on this route",
      });
    });

    it('should return 404 if employeeId is invalid or not exist', async () => {
      const employeeId = mongoose.Types.ObjectId().toHexString();

      const res = await request(app)
        .get(`${url}/${employeeId}/compensations`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(404);
      expect(res.body.success).toBeFalsy();
      expect(res.body).toEqual(
        expect.objectContaining({
          errors: expect.objectContaining({
            message: `Resource with an id of ${employeeId} not found`,
          }),
        }),
      );
    });
  });

  describe('Success Response', () => {
    it('should return success response if values are valid', async () => {
      const compensation = await Compensation.create({
        basicPay: 35000,
        effectivityDate: employee.hireDate,
        employee: employee._id,
        company: company._id,
      });

      const res = await request(app)
        .get(`${url}/${employee._id}/compensations`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBeTruthy();
      expect(res.body.compensations.length).toBe(1);
      expect(res.body.compensations).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            basicPay: 35000,
            _id: compensation._id.toString(),
          }),
        ]),
      );
    });
  });
});

describe('GET /api/v1/employees/:employeeId/compensations/:id', () => {
  let employee;
  let company;
  let token;
  let user;
  let compensation;

  beforeEach(async () => {
    token = await global.signIn();
    user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    company = await Company.create({
      name: 'Full suite',
      user: user._id,
      administrators: [user._id],
    });
    [employee] = await Employee.create(
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
    );
    compensation = await Compensation.create({
      basicPay: 35000,
      effectivityDate: employee.hireDate,
      employee: employee._id,
      company: company._id,
    });
  });

  const url = '/api/v1/employees';

  describe('Error response', () => {
    it('should return error response if not logged in', async () => {
      const res = await request(app).get(
        `${url}/${employee._id}/compensations/${compensation._id}`,
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
      company = await Company.create({
        name: 'PayTsek',
        user: mongoose.Types.ObjectId(),
        administrators: [user._id],
      });

      const res = await request(app)
        .get(`${url}/${employee._id}/compensations/${compensation._id}`)
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
        .get(`${url}/${employee._id}/compensations/${compensation._id}`)
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
      user = await User.create({
        username: 'jane doe',
        email: 'janedoe@gmail.com',
        password: '123456',
        firstName: 'Jane',
        lastName: 'Doe',
      });

      company = await Company.create({
        name: 'test company',
        user: user._id,
        administrators: [user._id],
      });

      const res = await request(app)
        .get(`${url}/${employee._id}/compensations/${compensation._id}`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(403);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: "You don't have permission to access on this route",
      });
    });

    it('should return 404 if employeeId is invalid or not exist', async () => {
      const employeeId = mongoose.Types.ObjectId().toHexString();

      const res = await request(app)
        .get(`${url}/${employeeId}/compensations/${compensation._id}`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(404);
      expect(res.body.success).toBeFalsy();
      expect(res.body).toEqual(
        expect.objectContaining({
          errors: expect.objectContaining({
            message: `Resource with an id of ${employeeId} not found`,
          }),
        }),
      );
    });

    it('should return 404 if status id param is invalid or not exist', async () => {
      const compensationId = mongoose.Types.ObjectId().toHexString();

      const res = await request(app)
        .get(`${url}/${employee._id}/compensations/${compensationId}`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(404);
      expect(res.body.success).toBeFalsy();
      expect(res.body).toEqual(
        expect.objectContaining({
          errors: expect.objectContaining({
            message: `Resource with an id of ${compensationId} not found`,
          }),
        }),
      );
    });
  });

  describe('Success Response', () => {
    it('should return success response if ids are valid', async () => {
      const res = await request(app)
        .get(`${url}/${employee._id}/compensations/${compensation._id}`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBeTruthy();
      expect(res.body.compensation).toEqual(
        expect.objectContaining({
          basicPay: 35000,
          _id: compensation._id.toString(),
        }),
      );
    });
  });
});

describe('POST /api/v1/employees/:employeeId/compensations', () => {
  let employee;
  let company;
  let token;
  let user;

  beforeEach(async () => {
    token = await global.signIn();
    user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    company = await Company.create({
      name: 'Full suite',
      user: user._id,
      administrators: [user._id],
    });
    [employee] = await Employee.create(
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
    );
  });

  const url = '/api/v1/employees';

  describe('Error response', () => {
    it('should return error response if not logged in', async () => {
      const res = await request(app).post(`${url}/${employee._id}/compensations`);

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
      company = await Company.create({
        name: 'PayTsek',
        user: mongoose.Types.ObjectId(),
        administrators: [user._id],
      });

      const res = await request(app)
        .post(`${url}/${employee._id}/compensations`)
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
        .post(`${url}/${employee._id}/compensations`)
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
      user = await User.create({
        username: 'jane doe',
        email: 'janedoe@gmail.com',
        password: '123456',
        firstName: 'Jane',
        lastName: 'Doe',
      });

      company = await Company.create({
        name: 'test company',
        user: user._id,
        administrators: [user._id],
      });

      const res = await request(app)
        .post(`${url}/${employee._id}/compensations`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(403);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: "You don't have permission to access on this route",
      });
    });

    it('should return 404 if employeeId is invalid or not exist', async () => {
      const employeeId = mongoose.Types.ObjectId().toHexString();

      const res = await request(app)
        .post(`${url}/${employeeId}/compensations`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(404);
      expect(res.body.success).toBeFalsy();
      expect(res.body).toEqual(
        expect.objectContaining({
          errors: expect.objectContaining({
            message: `Resource with an id of ${employeeId} not found`,
          }),
        }),
      );
    });
  });

  describe('Success Response', () => {
    it('should return success response if values are valid', async () => {
      const res = await request(app)
        .post(`${url}/${employee._id}/compensations`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' })
        .send({ basicPay: 35000, effectivityDate: '2020-09-09' });

      expect(res.status).toBe(201);
      expect(res.body.success).toBeTruthy();
      expect(res.body).toEqual(
        expect.objectContaining({
          compensation: expect.objectContaining({
            basicPay: 35000,
            effectivityDate: '2020-09-09T00:00:00.000Z',
          }),
        }),
      );
      expect(res.body.compensation).toHaveProperty('_id');
    });
  });
});

describe('PUT /api/v1/employees/:employeeId/compensations/:id', () => {
  let employee;
  let company;
  let token;
  let user;
  let compensation;

  beforeEach(async () => {
    token = await global.signIn();
    user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    company = await Company.create({
      name: 'Full suite',
      user: user._id,
      administrators: [user._id],
    });
    [employee] = await Employee.create(
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
    );
    compensation = await Compensation.create({
      basicPay: 12000,
      effectivityDate: employee.hireDate,
      employee: employee._id,
      company: company._id,
    });
  });

  const url = '/api/v1/employees';

  describe('Error response', () => {
    it('should return error response if not logged in', async () => {
      const res = await request(app).put(
        `${url}/${employee._id}/compensations/${compensation._id}`,
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
      company = await Company.create({
        name: 'PayTsek',
        user: mongoose.Types.ObjectId(),
        administrators: [user._id],
      });

      const res = await request(app)
        .put(`${url}/${employee._id}/compensations/${compensation._id}`)
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
        .put(`${url}/${employee._id}/compensations/${compensation._id}`)
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
      user = await User.create({
        username: 'jane doe',
        email: 'janedoe@gmail.com',
        password: '123456',
        firstName: 'Jane',
        lastName: 'Doe',
      });

      company = await Company.create({
        name: 'test company',
        user: user._id,
        administrators: [user._id],
      });

      const res = await request(app)
        .put(`${url}/${employee._id}/compensations/${compensation._id}`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(403);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: "You don't have permission to access on this route",
      });
    });

    it('should return 404 if employeeId is invalid or not exist', async () => {
      const employeeId = mongoose.Types.ObjectId().toHexString();

      const res = await request(app)
        .put(`${url}/${employeeId}/compensations/${compensation._id}`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(404);
      expect(res.body.success).toBeFalsy();
      expect(res.body).toEqual(
        expect.objectContaining({
          errors: expect.objectContaining({
            message: `Resource with an id of ${employeeId} not found`,
          }),
        }),
      );
    });

    it('should return 404 if status id param is invalid or not exist', async () => {
      const compensationId = mongoose.Types.ObjectId().toHexString();

      const res = await request(app)
        .put(`${url}/${employee._id}/compensations/${compensationId}`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(404);
      expect(res.body.success).toBeFalsy();
      expect(res.body).toEqual(
        expect.objectContaining({
          errors: expect.objectContaining({
            message: `Resource with an id of ${compensationId} not found`,
          }),
        }),
      );
    });

    it('should return 400 if values are not valid', async () => {
      const res = await request(app)
        .put(`${url}/${employee._id}/compensations/${compensation._id}`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(400);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        basicPay: 'Basic Pay is required',
        effectivityDate: 'Effectivity Date is required',
      });
    });
  });

  describe('Success Response', () => {
    it('should return success response if ids are valid', async () => {
      const res = await request(app)
        .put(`${url}/${employee._id}/compensations/${compensation._id}`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' })
        .send({ basicPay: 50000, effectivityDate: '2020-01-01' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBeTruthy();
      expect(res.body.compensation).toEqual(
        expect.objectContaining({
          basicPay: 50000,
          effectivityDate: '2020-01-01T00:00:00.000Z',
        }),
      );
    });
  });
});

describe('DELETE /api/v1/employees/:employeeId/compensations/:id', () => {
  let employee;
  let company;
  let token;
  let user;
  let compensation;

  beforeEach(async () => {
    token = await global.signIn();
    user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    company = await Company.create({
      name: 'Full suite',
      user: user._id,
      administrators: [user._id],
    });
    [employee] = await Employee.create(
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
    );
    compensation = await Compensation.create({
      basicPay: 35000,
      effectivityDate: employee.hireDate,
      employee: employee._id,
      company: company._id,
    });
  });

  const url = '/api/v1/employees';

  describe('Error response', () => {
    it('should return error response if not logged in', async () => {
      const res = await request(app).delete(
        `${url}/${employee._id}/compensations/${compensation._id}`,
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
      company = await Company.create({
        name: 'PayTsek',
        user: mongoose.Types.ObjectId(),
        administrators: [user._id],
      });

      const res = await request(app)
        .delete(`${url}/${employee._id}/compensations/${compensation._id}`)
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
        .delete(`${url}/${employee._id}/compensations/${compensation._id}`)
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
      user = await User.create({
        username: 'jane doe',
        email: 'janedoe@gmail.com',
        password: '123456',
        firstName: 'Jane',
        lastName: 'Doe',
      });

      company = await Company.create({
        name: 'test company',
        user: user._id,
        administrators: [user._id],
      });

      const res = await request(app)
        .delete(`${url}/${employee._id}/compensations/${compensation._id}`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(403);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: "You don't have permission to access on this route",
      });
    });

    it('should return 404 if employeeId is invalid or not exist', async () => {
      const employeeId = mongoose.Types.ObjectId().toHexString();

      const res = await request(app)
        .delete(`${url}/${employeeId}/compensations/${compensation._id}`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(404);
      expect(res.body.success).toBeFalsy();
      expect(res.body).toEqual(
        expect.objectContaining({
          errors: expect.objectContaining({
            message: `Resource with an id of ${employeeId} not found`,
          }),
        }),
      );
    });

    it('should return 404 if status id param is invalid or not exist', async () => {
      const compensationId = mongoose.Types.ObjectId().toHexString();

      const res = await request(app)
        .delete(`${url}/${employee._id}/compensations/${compensationId}`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(404);
      expect(res.body.success).toBeFalsy();
      expect(res.body).toEqual(
        expect.objectContaining({
          errors: expect.objectContaining({
            message: `Resource with an id of ${compensationId} not found`,
          }),
        }),
      );
    });
  });

  describe('Success Response', () => {
    it('should return success response if ids are valid', async () => {
      const res = await request(app)
        .delete(`${url}/${employee._id}/compensations/${compensation._id}`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBeTruthy();
      expect(res.body.compensation).toEqual({});
      expect(res.body).toEqual(
        expect.objectContaining({
          compensation: {},
          message: `Compensation - ID:${compensation._id} successfully deleted`,
        }),
      );
    });
  });
});
