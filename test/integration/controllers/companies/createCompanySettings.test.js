const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const request = require('supertest');

const app = require('../../../../app');
const TestUtils = require('../../../../utils/testUtils');

describe('POST /api/v1/companies/:id/settings - createCompanySettings', () => {
  const url = '/api/v1/companies/settings';
  let token;

  beforeEach(async () => {
    token = await global.signIn();
  });

  it('should return 401 Not found and error response if company/slug is invalid or not found', async () => {
    const res = await request(app).post(`${url}`).auth(token, { type: 'bearer' });

    expect(res.status).toBe(401);
    expect(res.body.success).toBeFalsy();
    expect(res.body.errors).toMatchObject({
      message: 'No tenant, access denied',
    });
  });

  it('should return 401 if not logged in', async () => {
    const res = await request(app).post(`${url}`).send({});

    expect(res.status).toBe(401);
    expect(res.body.success).toBeFalsy();
    expect(res.body.errors).toMatchObject({
      message: 'No token, access denied',
    });
  });

  it('should return 401 if logged in user is not equal to company owner', async () => {
    const owner = jwt.verify(token, process.env.JWT_SECRET_KEY);

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
      administrators: [owner._id],
    });

    const res = await request(app)
      .post(`${url}`)
      .set({ 'x-company-tenant': company.slug })
      .auth(token, { type: 'bearer' });

    expect(res.status).toBe(401);
    expect(res.body.success).toBeFalsy();
    expect(res.body.errors).toMatchObject({
      message: 'User is not authorized',
    });
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
      .post(`${url}`)
      .set({ 'x-company-tenant': company.slug })
      .auth(token, { type: 'bearer' });

    expect(res.status).toBe(403);
    expect(res.body.success).toBeFalsy();
    expect(res.body.errors).toMatchObject({
      message: "You don't have permission to access on this route",
    });
  });

  it('should return error response if enum fields is invalid', async () => {
    let res = await request(app)
      .post('/api/v1/companies/name')
      .auth(token, { type: 'bearer' })
      .send({ name: 'PayTsek' });

    const { company } = res.body;

    res = await request(app)
      .post(`${url}`)
      .set({ 'x-company-tenant': company.slug })
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
        nightDifferential:
          '`sample` is not a valid enum value for path `nightDifferential`.',
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
    let res = await request(app)
      .post('/api/v1/companies/name')
      .auth(token, { type: 'bearer' })
      .send({ name: 'PayTsek' });

    const { company } = res.body;

    res = await request(app)
      .post(`${url}`)
      .set({ 'x-company-tenant': company.slug })
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
        'registeredAddress.zipCode': 'Zip code is required',
        'registeredAddress.country': 'Country is required',
        'registeredAddress.city': 'City is required',
        'registeredAddress.street': 'Street is required',
      }),
    );
  });

  it('should return 201 status code and success response if fields are valid', async () => {
    mongoose.connection.db.createCollection('departments');

    let res = await request(app)
      .post('/api/v1/companies/name')
      .auth(token, { type: 'bearer' })
      .send({ name: 'PayTsek' });

    const { company } = res.body;

    res = await request(app)
      .post(`${url}`)
      .auth(token, { type: 'bearer' })
      .set({ 'x-company-tenant': company.slug })
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
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBeTruthy();
    expect(Object.keys(res.body.companySettings)).toEqual(
      expect.arrayContaining(['_id']),
    );
  });
});
