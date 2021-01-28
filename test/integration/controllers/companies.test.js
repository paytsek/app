const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const request = require('supertest');

const app = require('../../../app');
const Company = require('../../../models/Company');
const User = require('../../../models/User');
const CompanySetting = require('../../../models/CompanySetting');

describe('POST /api/v1/companies/name - createCompany', () => {
  const url = '/api/v1/companies/name';

  it('should return 401 unauthorized', async () => {
    const res = await request(app).post(url).send({ name: 'PayTsek' });

    expect(res.status).toBe(401);
    expect(res.body.success).toBeFalsy();
    expect(res.body.errors).toMatchObject({
      message: 'No token, access denied',
    });
  });

  it('should return 201 status code and success response if name is valid', async () => {
    const token = await global.signIn();

    const res = await request(app)
      .post(url)
      .auth(token, { type: 'bearer' })
      .send({ name: 'PayTsek' });

    expect(res.status).toBe(201);
    expect(res.body.success).toBeTruthy();
    expect(res.body.company).toHaveProperty('_id', res.body.company._id, 'name', 'PayTsek');
  });

  it('should generate a slug when saving a company name', async () => {
    const token = await global.signIn();

    const { body } = await request(app)
      .post(url)
      .auth(token, { type: 'bearer' })
      .send({ name: 'Pay Tsek' });

    expect(body.company.slug).toMatch(/pay-tsek/);
  });

  it('should return 400 status code and error response if name is empty', async () => {
    const token = await global.signIn();

    const { status, body } = await request(app)
      .post(url)
      .auth(token, { type: 'bearer' })
      .send({ name: '' });

    expect(status).toBe(400);
    expect(body.success).toBeFalsy();
    expect(body.errors).toHaveProperty('name', 'Company name is required');
  });

  it('should return 400 status code and error response if name already exist', async () => {
    const token = await global.signIn();

    await Company.create({ name: 'PayTsek', user: mongoose.Types.ObjectId() });
    const { status, body } = await request(app)
      .post(url)
      .auth(token, { type: 'bearer' })
      .send({ name: 'PayTsek' });

    expect(status).toBe(400);
    expect(body.success).toBeFalsy();
    expect(body.errors).toHaveProperty('message', 'Duplicate field value entered');
  });
});

describe('PUT /api/v1/companies/name/:id - updateCompanyName', () => {
  const url = '/api/v1/companies/name';

  describe('Error Response', () => {
    it('should return error response not logged in', async () => {
      const res = await request(app).put(`${url}/${mongoose.Types.ObjectId()}`);

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'No token, access denied',
      });
    });

    it('should return error response if id params is invalid or not found', async () => {
      const token = await global.signIn();
      const id = mongoose.Types.ObjectId();

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
      const token = await global.signIn();
      const res = await request(app).put(`${url}/${company._id}`).auth(token, { type: 'bearer' });

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
      const token = await global.signIn();
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
      const token = await global.signIn();
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

describe('DELETE /api/v1/companies/name/:id - deleteCompany', () => {
  const url = '/api/v1/companies/name';

  describe('Error Response', () => {
    it('should return error response if not logged in', async () => {
      const res = await request(app).delete(`${url}/${mongoose.Types.ObjectId()}`);

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'No token, access denied',
      });
    });

    it('should return error response if id params is invalid', async () => {
      const id = mongoose.Types.ObjectId();
      const token = await global.signIn();

      const res = await request(app).delete(`${url}/${id}`).auth(token, { type: 'bearer' });

      expect(res.status).toBe(404);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: `Resource with an id of ${id} not found`,
      });
    });

    it('should return error response if logged user not own the company', async () => {
      const token = await global.signIn();
      const user = await User.create({
        username: 'rodrigocarlos',
        email: 'rodrigo@gmail.com',
        password: '123456',
        firstName: 'Rodrigo',
        lastName: 'Carlos',
      });
      const company = await Company.create({
        name: 'Sample company',
        user: user._id,
      });

      const res = await request(app)
        .delete(`${url}/${company._id}`)
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'Not authorized to access this route',
      });
    });
  });

  describe('Success Response', () => {
    it('should return success response if values are valid', async () => {
      const token = await global.signIn();
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await Company.create({ name: 'PayTsek', user: user._id });
      await CompanySetting.create({
        company: company._id,
        frequency: 'monthly',
        firstCutOff: 1,
        firstPayout: 5,
        registeredAddress: {
          street: '24c Marcoville',
          city: 'Baguio city',
          country: 'Philippines',
          zipCode: '2600',
        },
        departments: ['staff'],
      });

      expect(await CompanySetting.countDocuments()).toBe(1);

      const res = await request(app)
        .delete(`${url}/${company._id}`)
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBeTruthy();
      expect(Object.keys(res.body.company).length).toEqual(0);
      expect(res.body).toEqual(
        expect.objectContaining({
          message: `PayTsek - ID:${company._id} successfully deleted`,
        }),
      );
      expect(await CompanySetting.countDocuments()).toEqual(0);
    });

    it('should return success response logged in is an admin', async () => {
      const token = await global.signInAdmin();
      const user = await User.create({
        username: 'rodrigo',
        email: 'rodrigo@gmail.com',
        password: '123456',
        firstName: 'Rodrigo',
        lastName: 'Carlos',
      });
      const company = await Company.create({ name: 'PayTsek', user: user._id });
      await CompanySetting.create({
        company: company._id,
        frequency: 'monthly',
        firstCutOff: 1,
        firstPayout: 5,
        registeredAddress: {
          street: '24c Marcoville',
          city: 'Baguio city',
          country: 'Philippines',
          zipCode: '2600',
        },
        departments: ['staff'],
      });

      expect(await CompanySetting.countDocuments()).toBe(1);

      const res = await request(app)
        .delete(`${url}/${company._id}`)
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBeTruthy();
      expect(Object.keys(res.body.company).length).toEqual(0);
      expect(res.body).toEqual(
        expect.objectContaining({
          message: `PayTsek - ID:${company._id} successfully deleted`,
        }),
      );
      expect(await CompanySetting.countDocuments()).toEqual(0);
    });
  });
});

describe('GET api/v1/companies - getCompanies', () => {
  const url = '/api/v1/companies';

  describe('Error Response', () => {
    it('should return error reponse if not logged in', async () => {
      const res = await request(app).get(url);

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({ message: 'No token, access denied' });
    });

    it('should return error if token is invalid', async () => {
      const token = jwt.sign({ name: 'invalid' }, 'secret');

      const res = await request(app).get(url).auth(token, { type: 'bearer' });

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({ message: 'Not authorize to access this route' });
    });
  });

  it('should get all companies and 200 status code', async () => {
    const token = await global.signIn();
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);

    await Company.create([
      { name: 'PayTsek', user: user._id },
      { name: 'Fullsuite', user: user._id },
    ]);

    const { status, body } = await request(app).get(url).auth(token, { type: 'bearer' });

    expect(status).toBe(200);
    expect(body.success).toBeTruthy();
    expect(body.companies.length).toEqual(2);
    expect(body.companies).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'PayTsek' }),
        expect.objectContaining({ name: 'Fullsuite' }),
      ]),
    );
  });
});

describe('GET /api/v1/companies/:id - getCompany', () => {
  const url = '/api/v1/companies';

  describe('Error Response', () => {
    it('should return error response if not logged in', async () => {
      const res = await request(app).get(`${url}/${mongoose.Types.ObjectId()}`);

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({ message: 'No token, access denied' });
    });

    it('should return error response if not own the company', async () => {
      const user = await User.create({
        email: 'rodrigo@gmail.com',
        password: '123456',
        username: 'rodrigo123',
        firstName: 'Rodrigo',
        lastName: 'Carlos',
      });
      const company = await Company.create({ user: user._id, name: 'PayTsek' });
      const token = await global.signIn();

      const res = await request(app).get(`${url}/${company._id}`).auth(token, { type: 'bearer' });

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({ message: 'Not authorize to access this route' });
    });
  });

  describe('Success Response', () => {
    it('should return success response if logged in and admin', async () => {
      const admin = await User.create({
        username: 'rodrigo',
        email: 'rodrigo@gmail.com',
        password: '123456',
        firstName: 'Rodrigo',
        lastName: 'Carlos',
        role: 'admin',
      });
      const payload = {
        _id: admin._id,
        email: admin.email,
        firstName: admin.firstName,
        lastName: admin.lastName,
      };
      const user = await User.create({
        username: 'rodrigo1',
        email: 'rodrigo@gmail1.com',
        password: '123456',
        firstName: 'Rodrigo1',
        lastName: 'Carlos1',
      });
      const company = await Company.create({ name: 'PayTsek', user: user._id });
      let token = await global.signIn({ _id: user._id });

      let res = await request(app).get(`${url}/${company._id}`).auth(token, { type: 'bearer' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBeTruthy();
      expect(res.body.company).toEqual(
        expect.objectContaining({
          name: 'PayTsek',
          slug: 'paytsek',
          _id: company._id.toString(),
        }),
      );

      token = await global.signInAdmin(payload);

      res = await request(app).get(`${url}/${company._id}`).auth(token, { type: 'bearer' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBeTruthy();
      expect(res.body.company).toEqual(
        expect.objectContaining({
          name: 'PayTsek',
          slug: 'paytsek',
          _id: company._id.toString(),
        }),
      );
    });
  });
});

describe('POST /api/v1/companies/:id/settings - createCompanySettings', () => {
  const url = '/api/v1/companies';

  it('should return 400 Not found and error response if company is invalid or not found', async () => {
    const token = await global.signIn();

    const id = mongoose.Types.ObjectId();

    const res = await request(app).post(`${url}/${id}/settings`).auth(token, { type: 'bearer' });

    expect(res.status).toBe(404);
    expect(res.body.success).toBeFalsy();
    expect(res.body.errors).toMatchObject({
      message: 'No company is selected',
    });
  });

  it('should return 401 if not logged in', async () => {
    const company = await Company.create({
      name: 'PayTsek',
      user: mongoose.Types.ObjectId(),
    });

    const res = await request(app).post(`${url}/${company._id}/settings`).send({});

    expect(res.status).toBe(401);
    expect(res.body.success).toBeFalsy();
    expect(res.body.errors).toMatchObject({
      message: 'No token, access denied',
    });
  });

  it('should return 401 if logged in user is not equal to company owner', async () => {
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
    });

    const res = await request(app)
      .post(`${url}/${company._id}/settings`)
      .auth(token, { type: 'bearer' });

    expect(res.status).toBe(401);
    expect(res.body.success).toBeFalsy();
    expect(res.body.errors).toMatchObject({
      message: 'User is not authorized',
    });
  });

  it('should return error response if enum fields is invalid', async () => {
    const token = await global.signIn();

    let res = await request(app)
      .post('/api/v1/companies/name')
      .auth(token, { type: 'bearer' })
      .send({ name: 'PayTsek' });

    const { company } = res.body;

    res = await request(app)
      .post(`${url}/${company._id}/settings`)
      .auth(token, { type: 'bearer' })
      .send({
        secondPayout: 30,
        firstPayout: 1,
        secondCutOff: 20,
        firstCutOff: 5,
        category: 'sample',
        frequency: 'sample',
        reportingBase: 'sample',
        nightDifferential: 'sample',
        overtime: 'sample',
        accountingJournal: {
          deminimisBenefits: 'sample',
          employeeBenefits: 'sample',
          hdmfPayable: 'sample',
          netPay: 'sample',
          nonTaxableCompensation: 'sample',
          phicPayable: 'sample',
          postTaxDeduction: 'sample',
          preTaxDeduction: 'sample',
          reimbursement: 'sample',
          sssPayable: 'sample',
          taxDue: 'sample',
          taxableCompensation: 'sample',
          thirteenthMonthPay: 'sample',
        },
      });

    expect(res.status).toBe(400);
    expect(res.body.success).toBeFalsy();
    expect(res.body.errors).toEqual(
      expect.objectContaining({
        category: '`sample` is not a valid enum value for path `category`.',
        frequency: '`sample` is not a valid enum value for path `frequency`.',
        reportingBase: '`sample` is not a valid enum value for path `reportingBase`.',
        nightDifferential: '`sample` is not a valid enum value for path `nightDifferential`.',
        overtime: '`sample` is not a valid enum value for path `overtime`.',
        'accountingJournal.deminimisBenefits':
          '`sample` is not a valid enum value for path `accountingJournal.deminimisBenefits`.',
        'accountingJournal.employeeBenefits':
          '`sample` is not a valid enum value for path `accountingJournal.employeeBenefits`.',
        'accountingJournal.hdmfPayable':
          '`sample` is not a valid enum value for path `accountingJournal.hdmfPayable`.',
        'accountingJournal.netPay':
          '`sample` is not a valid enum value for path `accountingJournal.netPay`.',
        'accountingJournal.nonTaxableCompensation':
          '`sample` is not a valid enum value for path `accountingJournal.nonTaxableCompensation`.',
        'accountingJournal.phicPayable':
          '`sample` is not a valid enum value for path `accountingJournal.phicPayable`.',
        'accountingJournal.postTaxDeduction':
          '`sample` is not a valid enum value for path `accountingJournal.postTaxDeduction`.',
        'accountingJournal.preTaxDeduction':
          '`sample` is not a valid enum value for path `accountingJournal.preTaxDeduction`.',
        'accountingJournal.reimbursement':
          '`sample` is not a valid enum value for path `accountingJournal.reimbursement`.',
        'accountingJournal.sssPayable':
          '`sample` is not a valid enum value for path `accountingJournal.sssPayable`.',
        'accountingJournal.taxDue':
          '`sample` is not a valid enum value for path `accountingJournal.taxDue`.',
        'accountingJournal.taxableCompensation':
          '`sample` is not a valid enum value for path `accountingJournal.taxableCompensation`.',
        'accountingJournal.thirteenthMonthPay':
          '`sample` is not a valid enum value for path `accountingJournal.thirteenthMonthPay`.',
      }),
    );
  });

  it('should return error response if condition field is invalid', async () => {
    const token = await global.signIn();

    let res = await request(app)
      .post('/api/v1/companies/name')
      .auth(token, { type: 'bearer' })
      .send({ name: 'PayTsek' });

    const { company } = res.body;

    res = await request(app)
      .post(`${url}/${company._id}/settings`)
      .auth(token, { type: 'bearer' })
      .send({
        frequency: 'semiMonthly',
        nightDifferential: 'percentage',
        nightDifferentialPercentage: '',
        overtime: 'hourly',
        overtimePay: '',
        overtimeRestDayPay: '',
        holiday: true,
        regularHolidayPay: '',
        specialHolidayPay: '',
      });

    expect(res.status).toBe(400);
    expect(res.body.success).toBeFalsy();
    expect(res.body.errors).toEqual(
      expect.objectContaining({
        secondPayout: 'Second Payout is required',
        firstPayout: 'First Payout is required',
        secondCutOff: 'Second Cut Off is required',
        firstCutOff: 'First Cut Off is required',
        nightDifferentialPercentage: 'Night Differential Percentage is required',
        overtimePay: 'Overtime Pay is required',
        overtimeRestDayPay: 'Overtime Rest Day Pay is required',
        regularHolidayPay: 'Regular Holiday Pay is required',
        specialHolidayPay: 'Special Holiday Pay is required',
        departments: 'Please add department',
        'registeredAddress.zipCode': 'Zip code is required',
        'registeredAddress.country': 'Country is required',
        'registeredAddress.city': 'City is required',
        'registeredAddress.street': 'Street is required',
      }),
    );
  });

  it('should return 201 status code and success response if fields are valid', async () => {
    const token = await global.signIn();

    let res = await request(app)
      .post('/api/v1/companies/name')
      .auth(token, { type: 'bearer' })
      .send({ name: 'PayTsek' });

    const { company } = res.body;

    res = await request(app)
      .post(`${url}/${company._id}/settings`)
      .auth(token, { type: 'bearer' })
      .send({
        secondPayout: 30,
        firstPayout: 1,
        secondCutOff: 20,
        firstCutOff: 5,
        registeredAddress: {
          street: '24c Marcoville',
          city: 'Baguio city',
          country: 'Philippines',
          zipCode: '2600',
        },
        departments: ['staff'],
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBeTruthy();
    expect(Object.keys(res.body.companySettings)).toEqual(expect.arrayContaining(['_id']));
  });
});

describe('PUT /api/v1/companies/:id/settings/:companySettingsId - updateCompanySettings', () => {
  const url = '/api/v1/companies';

  describe('Error Response', () => {
    it('should return error response if not logged in', async () => {
      const res = await request(app).put(
        `${url}/${mongoose.Types.ObjectId()}/settings/${mongoose.Types.ObjectId()}`,
      );

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'No token, access denied',
      });
    });

    it('should return error if company not own by the logged in user', async () => {
      const user = await User.create({
        username: 'rodrigocarlos',
        email: 'rodrigo@gmail.com',
        password: '123456',
        firstName: 'Rodrigo',
        lastName: 'Carlos',
      });
      const company = await Company.create({ name: 'PayTsek', user: user._id });
      const token = await global.signIn();

      const res = await request(app)
        .put(`${url}/${company._id}/settings/${mongoose.Types.ObjectId()}`)
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'Not authorized to access this route',
      });
    });

    it('should return error if company id params is invalid', async () => {
      const token = await global.signIn();
      const id = mongoose.Types.ObjectId();

      const res = await request(app)
        .put(`${url}/${id}/settings/${mongoose.Types.ObjectId()}`)
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'Invalid Company id',
      });
    });

    it('should return error if company does not have settings created', async () => {
      const token = await global.signIn();
      const loggedInUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const companySettingsId = mongoose.Types.ObjectId();
      const company = await Company.create({
        name: 'PayTsek',
        user: loggedInUser._id,
      });

      const res = await request(app)
        .put(`${url}/${company._id}/settings/${companySettingsId}`)
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(404);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: `Resource with an id of ${companySettingsId} not found`,
      });
    });

    it('should return error response when invalid values are entered', async () => {
      const token = await global.signIn();
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await Company.create({ name: 'PayTsek', user: user._id });
      const companySettings = await CompanySetting.create({
        company: company._id,
        firstCutOff: 1,
        firstPayout: 5,
        secondCutOff: 15,
        secondPayout: 20,
        registeredAddress: {
          street: '24c Marcoville',
          city: 'Baguio city',
          country: 'Philippines',
          zipCode: '2600',
        },
        departments: ['staff'],
      });

      const res = await request(app)
        .put(`${url}/${company._id}/settings/${companySettings._id}`)
        .auth(token, { type: 'bearer' })
        .send({
          category: '',
          frequency: '',
          reportingBase: '',
          nightDifferential: '',
          overtime: '',
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toEqual(
        expect.objectContaining({
          category: 'Category is Required',
          frequency: 'Payroll frequency is required',
          reportingBase: 'Reporting base is required',
          nightDifferential: 'Nigth differential is required',
          overtime: 'Overtime is required',
        }),
      );
    });

    it('should return error response when condition fields is invalid', async () => {
      const token = await global.signIn();
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await Company.create({ name: 'PayTsek', user: user._id });
      const companySettings = await CompanySetting.create({
        company: company._id,
        firstCutOff: 1,
        firstPayout: 5,
        secondCutOff: 15,
        secondPayout: 20,
        registeredAddress: {
          street: '24c Marcoville',
          city: 'Baguio city',
          country: 'Philippines',
          zipCode: '2600',
        },
        departments: ['staff'],
      });

      const res = await request(app)
        .put(`${url}/${company._id}/settings/${companySettings._id}`)
        .auth(token, { type: 'bearer' })
        .send({
          frequency: 'semiMonthly',
          nightDifferential: 'percentage',
          nightDifferentialPercentage: '',
          overtime: 'hourly',
          overtimePay: '',
          overtimeRestDayPay: '',
          holiday: true,
          regularHolidayPay: '',
          specialHolidayPay: '',
          secondPayout: '',
          firstPayout: '',
          secondCutOff: '',
          firstCutOff: '',
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toEqual(
        expect.objectContaining({
          nightDifferentialPercentage: 'Night Differential Percentage is required',
          overtimePay: 'Overtime Pay is required',
          overtimeRestDayPay: 'Overtime Rest Day Pay is required',
          regularHolidayPay: 'Regular Holiday Pay is required',
          specialHolidayPay: 'Special Holiday Pay is required',
          secondPayout: 'Second Payout is required',
          firstPayout: 'First Payout is required',
          secondCutOff: 'Second Cut Off is required',
          firstCutOff: 'First Cut Off is required',
        }),
      );
    });
  });

  describe('Success Response', () => {
    it('should return success reponse if entered values are valid', async () => {
      const token = await global.signIn();
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await Company.create({ name: 'PayTsek', user: user._id });
      const companySettings = await CompanySetting.create({
        company: company._id,
        firstCutOff: 1,
        firstPayout: 5,
        secondCutOff: 15,
        secondPayout: 20,
        registeredAddress: {
          street: '24c Marcoville',
          city: 'Baguio city',
          country: 'Philippines',
          zipCode: '2600',
        },
        departments: ['staff'],
      });

      const res = await request(app)
        .put(`${url}/${company._id}/settings/${companySettings._id}`)
        .auth(token, { type: 'bearer' })
        .send({
          accountingJournal: {
            deminimisBenefits: 'wagesPayable',
            employeeBenefits: 'wagesPayable',
            hdmfPayable: 'wagesPayable',
            netPay: 'wagesPayable',
            nonTaxableCompensation: 'wagesPayable',
            phicPayable: 'wagesPayable',
            postTaxDeduction: 'wagesPayable',
            preTaxDeduction: 'wagesPayable',
            reimbursement: 'wagesPayable',
            sssPayable: 'wagesPayable',
            taxDue: 'wagesPayable',
            taxableCompensation: 'wagesPayable',
            thirteenthMonthPay: 'wagesPayable',
          },
          category: 'private',
          frequency: 'semiMonthly',
          reportingBase: 'payrollCutOffs',
          workingDays: 22,
          nightDifferential: 'disabled',
          nightDifferentialPercentage: 0.1,
          overtime: 'disabled',
          overtimePay: 1.25,
          overtimeRestDayPay: 1.3,
          holiday: false,
          regularHolidayPay: 1,
          specialHolidayPay: 0.3,
          taxReliefInternationTaxTreaty: false,
          deminimis: false,
          emailNotification: false,
          hideEmployeeList: false,
          taxablePays: ['Allowance'],
          nonTaxablePays: ['Food'],
          sssCalculation: { deminimis: false },
          phicCalculation: { deminimis: false },
          thirteenthMonthPayCalculation: { deminimis: false, absences: false },
          departments: ['Staff', 'Head'],
          firstCutOff: 1,
          firstPayout: 5,
          secondCutOff: 15,
          secondPayout: 20,
          registeredAddress: {
            street: '24f Marcoville',
            city: 'Baguio city',
            country: 'Philippines',
            zipCode: '2600',
          },
          formattedAddress: '24f Marcoville, Baguio city, Philippines',
          zipCode: '2600',
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBeTruthy();
      expect(res.body.companySettings).toEqual(
        expect.objectContaining({
          registeredAddress: {
            street: '24f Marcoville',
            city: 'Baguio city',
            country: 'Philippines',
            zipCode: '2600',
          },
          accountingJournal: {
            deminimisBenefits: 'wagesPayable',
            employeeBenefits: 'wagesPayable',
            hdmfPayable: 'wagesPayable',
            netPay: 'wagesPayable',
            nonTaxableCompensation: 'wagesPayable',
            phicPayable: 'wagesPayable',
            postTaxDeduction: 'wagesPayable',
            preTaxDeduction: 'wagesPayable',
            reimbursement: 'wagesPayable',
            sssPayable: 'wagesPayable',
            taxDue: 'wagesPayable',
            taxableCompensation: 'wagesPayable',
            thirteenthMonthPay: 'wagesPayable',
          },
          category: 'private',
          frequency: 'semiMonthly',
          reportingBase: 'payrollCutOffs',
          workingDays: 22,
          nightDifferential: 'disabled',
          nightDifferentialPercentage: 0.1,
          overtime: 'disabled',
          overtimePay: 1.25,
          overtimeRestDayPay: 1.3,
          holiday: false,
          regularHolidayPay: 1,
          specialHolidayPay: 0.3,
          taxReliefInternationTaxTreaty: false,
          deminimis: false,
          emailNotification: false,
          hideEmployeeList: false,
          taxablePays: ['Allowance'],
          nonTaxablePays: ['Food'],
          sssCalculation: { deminimis: false },
          phicCalculation: { deminimis: false },
          thirteenthMonthPayCalculation: { deminimis: false, absences: false },
          departments: ['Staff', 'Head'],
          firstCutOff: 1,
          firstPayout: 5,
          secondCutOff: 15,
          secondPayout: 20,
          formattedAddress: '24f Marcoville, Baguio city, Philippines',
          zipCode: '2600',
        }),
      );
    });
  });
});

describe('DELETE /api/v1/companies/:id/settings/:companySettingsId - deleteCompanySettings', () => {
  const url = '/api/v1/companies';

  describe('Error Response', () => {
    it('should return error response if not logged in', async () => {
      const res = await request(app).put(
        `${url}/${mongoose.Types.ObjectId()}/settings/${mongoose.Types.ObjectId()}`,
      );

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'No token, access denied',
      });
    });

    it('should return error if company not own by the logged in user', async () => {
      const user = await User.create({
        username: 'rodrigocarlos',
        email: 'rodrigo@gmail.com',
        password: '123456',
        firstName: 'Rodrigo',
        lastName: 'Carlos',
      });
      const company = await Company.create({ name: 'PayTsek', user: user._id });
      const token = await global.signIn();

      const res = await request(app)
        .put(`${url}/${company._id}/settings/${mongoose.Types.ObjectId()}`)
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'Not authorized to access this route',
      });
    });

    it('should return error if company id params is invalid', async () => {
      const token = await global.signIn();
      const id = mongoose.Types.ObjectId();

      const res = await request(app)
        .put(`${url}/${id}/settings/${mongoose.Types.ObjectId()}`)
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'Invalid Company id',
      });
    });

    it('should return error if company does not have settings created', async () => {
      const token = await global.signIn();
      const loggedInUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const companySettingsId = mongoose.Types.ObjectId();
      const company = await Company.create({
        name: 'PayTsek',
        user: loggedInUser._id,
      });

      const res = await request(app)
        .put(`${url}/${company._id}/settings/${companySettingsId}`)
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(404);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: `Resource with an id of ${companySettingsId} not found`,
      });
    });
  });

  describe('Success Response', () => {
    it('should return success response if logged in user, comany and settings are valid', async () => {
      const token = await global.signIn();
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await Company.create({ name: 'PayTsek', user: user._id });
      const companySettings = await CompanySetting.create({
        frequency: 'monthly',
        firstPayout: 5,
        firstCutOff: 1,
        company: company._id,
        registeredAddress: {
          street: '24c Marcoville',
          city: 'Baguio city',
          country: 'Philippines',
          zipCode: '2600',
        },
        departments: ['staff'],
      });

      const res = await request(app)
        .delete(`${url}/${company._id}/settings/${companySettings._id}`)
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBeTruthy();
      expect(Object.keys(res.body.companySettings).length).toEqual(0);
      expect(res.body).toEqual(
        expect.objectContaining({
          message: `Company Settings - ID:${companySettings._id} successfully deleted`,
        }),
      );
    });
  });
});

describe('POST /api/v1/companies/slug/:slug - setCompanySlug', () => {
  const url = '/api/v1/companies/slug';

  describe('Error Response', () => {
    it('should return error response if no token', async () => {
      const res = await request(app).post(`${url}/test-company`);

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({ message: 'No token, access denied' });
    });

    it('should return error response if invalid slug params', async () => {
      const token = await global.signIn();
      const company = await Company.create({ name: 'PayTsek', user: mongoose.Types.ObjectId() });

      let res = await request(app).post(`${url}/invalid`).auth(token, { type: 'bearer' });

      expect(res.status).toBe(400);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'Resource with an id of invalid not found',
      });

      res = await request(app).post(`${url}/${company.slug}`).auth(token, { type: 'bearer' });

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({ message: 'Not authorize to access this route' });
    });
  });

  describe('Success Response', () => {
    it('should return success response if valid slug', async () => {
      const token = await global.signIn();
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await Company.create({ name: 'payTsek', user: user._id });

      const res = await request(app).post(`${url}/${company.slug}`).auth(token, { type: 'bearer' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBeTruthy();
      expect(res.body.slug).toMatch(/paytsek/);
    });

    it('should return success response if user is an admin', async () => {
      const token = await global.signInAdmin();
      await Company.create({ name: 'payTsek', user: mongoose.Types.ObjectId() });

      const res = await request(app).post(`${url}/paytsek`).auth(token, { type: 'bearer' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBeTruthy();
      expect(res.body).toMatchObject({ slug: 'paytsek' });
    });
  });
});
