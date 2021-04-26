const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const request = require('supertest');

const app = require('../../../app');
const Company = require('../../../models/Company');
const User = require('../../../models/User');
const CompanySetting = require('../../../models/CompanySetting');

describe('POST /api/v1/companies/:id/settings - createCompanySettings', () => {
  const url = '/api/v1/companies/settings';

  it('should return 401 Not found and error response if company/slug is invalid or not found', async () => {
    const token = await global.signIn();

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
    const token = await global.signIn();

    const owner = jwt.verify(token, process.env.JWT_SECRET_KEY);

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
    const token = await global.signIn();

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
    const token = await global.signIn();

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

    const token = await global.signIn();

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

describe('PUT /api/v1/companies/:id/settings/:companySettingsId - updateCompanySettings', () => {
  const url = '/api/v1/companies/settings';

  describe('Error Response', () => {
    it('should return error response if not logged in', async () => {
      const res = await request(app).put(`${url}/${mongoose.Types.ObjectId()}`);

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
      const token = await global.signIn();

      const owner = jwt.verify(token, process.env.JWT_SECRET_KEY);

      const company = await Company.create({
        name: 'PayTsek',
        user: user._id,
        administrators: [owner._id],
      });

      const res = await request(app)
        .put(`${url}/${mongoose.Types.ObjectId()}`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'Not authorized to access this route',
      });
    });

    it('should return error if no company slug or invalid', async () => {
      const token = await global.signIn();

      const res = await request(app)
        .put(`${url}/${mongoose.Types.ObjectId()}`)
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'No tenant, access denied',
      });
    });

    it('should return error if company does not have settings created', async () => {
      const token = await global.signIn();
      const loggedInUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const companySettingsId = mongoose.Types.ObjectId();
      const company = await Company.create({
        name: 'PayTsek',
        user: loggedInUser._id,
        administrators: [loggedInUser._id],
      });

      const res = await request(app)
        .put(`${url}/${companySettingsId}`)
        .set({ 'x-company-tenant': company.slug })
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
      const company = await Company.create({
        name: 'PayTsek',
        user: user._id,
        administrators: [user._id],
      });
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
        departments: [mongoose.Types.ObjectId()],
      });

      const res = await request(app)
        .put(`${url}/${companySettings._id}`)
        .set({ 'x-company-tenant': company.slug })
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
      const company = await Company.create({
        name: 'PayTsek',
        user: user._id,
        administrators: [user._id],
      });
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
        departments: [mongoose.Types.ObjectId()],
      });

      const res = await request(app)
        .put(`${url}/${companySettings._id}`)
        .auth(token, { type: 'bearer' })
        .set({ 'x-company-tenant': company.slug })
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
        .post(`${url}`)
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
    it('should return success reponse if entered values are valid', async () => {
      const token = await global.signIn();
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await Company.create({
        name: 'PayTsek',
        user: user._id,
        administrators: [user._id],
      });
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
        departments: [mongoose.Types.ObjectId()],
      });

      const taxablePayId = mongoose.Types.ObjectId().toHexString();
      const nonTaxablePayId = mongoose.Types.ObjectId().toHexString();

      const res = await request(app)
        .put(`${url}/${companySettings._id}`)
        .auth(token, { type: 'bearer' })
        .set({ 'x-company-tenant': company.slug })
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
          sssCalculation: {
            deminimis: false,
            taxablePays: [taxablePayId],
            nonTaxablePays: [nonTaxablePayId],
          },
          phicCalculation: {
            deminimis: false,
            taxablePays: [taxablePayId],
            nonTaxablePays: [nonTaxablePayId],
          },
          thirteenthMonthPayCalculation: {
            deminimis: false,
            absences: false,
            taxablePays: [taxablePayId],
            nonTaxablePays: [nonTaxablePayId],
          },
          departments: [mongoose.Types.ObjectId(), mongoose.Types.ObjectId()],
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
          sssCalculation: {
            deminimis: false,
            taxablePays: [taxablePayId],
            nonTaxablePays: [nonTaxablePayId],
          },
          phicCalculation: {
            deminimis: false,
            taxablePays: [taxablePayId],
            nonTaxablePays: [nonTaxablePayId],
          },
          thirteenthMonthPayCalculation: {
            deminimis: false,
            absences: false,
            taxablePays: [taxablePayId],
            nonTaxablePays: [nonTaxablePayId],
          },
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
  const url = '/api/v1/companies/settings';

  describe('Error Response', () => {
    it('should return error response if not logged in', async () => {
      const res = await request(app).put(`${url}/${mongoose.Types.ObjectId()}`);

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'No token, access denied',
      });
    });

    it('should return error if company not own by the logged in user', async () => {
      const token = await global.signIn();

      const loggedInUser = jwt.verify(token, process.env.JWT_SECRET_KEY);

      const user = await User.create({
        username: 'rodrigocarlos',
        email: 'rodrigo@gmail.com',
        password: '123456',
        firstName: 'Rodrigo',
        lastName: 'Carlos',
      });
      const company = await Company.create({
        name: 'PayTsek',
        user: user._id,
        administrators: [loggedInUser._id],
      });

      const res = await request(app)
        .put(`${url}/${mongoose.Types.ObjectId()}`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'Not authorized to access this route',
      });
    });

    it('should return error if company slug is invalid or not found', async () => {
      const token = await global.signIn();

      const res = await request(app)
        .put(`${url}/${mongoose.Types.ObjectId()}`)
        .set({ 'x-company-tenant': 'invalid-company' })
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'No Company, access denied',
      });
    });

    it('should return error if company does not have settings created', async () => {
      const token = await global.signIn();
      const loggedInUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const companySettingsId = mongoose.Types.ObjectId();
      const company = await Company.create({
        name: 'PayTsek',
        user: loggedInUser._id,
        administrators: [loggedInUser._id],
      });

      const res = await request(app)
        .put(`${url}/${companySettingsId}`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(404);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: `Resource with an id of ${companySettingsId} not found`,
      });
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
        .post(`${url}`)
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
    it('should return success response if logged in user, comany and settings are valid', async () => {
      const token = await global.signIn();
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await Company.create({
        name: 'PayTsek',
        user: user._id,
        administrators: [user._id],
      });
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
        departments: [mongoose.Types.ObjectId()],
      });

      const res = await request(app)
        .delete(`${url}/${companySettings._id}`)
        .set({ 'x-company-tenant': company.slug })
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

describe('POST /api/v1/companies/tenant/:slug - setcompanyTenant', () => {
  const url = '/api/v1/companies/tenant';

  describe('Error Response', () => {
    it('should return error response if no token', async () => {
      const res = await request(app).post(`${url}/test-company`);

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({ message: 'No token, access denied' });
    });

    it('should return error response if invalid slug params', async () => {
      const token = await global.signIn();
      const company = await Company.create({
        name: 'PayTsek',
        user: mongoose.Types.ObjectId(),
      });

      let res = await request(app).post(`${url}/invalid`).auth(token, { type: 'bearer' });

      expect(res.status).toBe(404);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'Resource with an id of invalid not found',
      });

      res = await request(app)
        .post(`${url}/${company.slug}`)
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'Not authorize to access this route',
      });
    });
  });

  describe('Success Response', () => {
    it('should return success response if valid slug', async () => {
      const token = await global.signIn();
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await Company.create({ name: 'payTsek', user: user._id });

      const res = await request(app)
        .post(`${url}/${company.slug}`)
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBeTruthy();
      expect(res.body.tenant).toMatchObject({
        slug: 'paytsek',
        id: company._id.toString(),
      });
    });

    it('should return success response if user is an admin', async () => {
      const token = await global.signInAdmin();
      const company = await Company.create({
        name: 'payTsek',
        user: mongoose.Types.ObjectId(),
      });

      const res = await request(app)
        .post(`${url}/paytsek`)
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBeTruthy();
      expect(res.body.tenant).toMatchObject({
        slug: 'paytsek',
        id: company._id.toString(),
      });
    });
  });
});

describe('GET /api/v1/companies/tenant/:slug - getCompanyTenant', () => {
  const url = '/api/v1/companies/tenant';

  describe('Error Response', () => {
    it('should return error response if no token', async () => {
      const res = await request(app).get(`${url}/test-company`);

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({ message: 'No token, access denied' });
    });

    it('should return error response if no x-company-tenant set', async () => {
      const token = await global.signIn();

      const res = await request(app)
        .get(`${url}/test-company`)
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({ message: 'No tenant, access denied' });
    });

    it('should return error response if invalid slug params', async () => {
      const token = await global.signIn();
      const company = await Company.create({
        name: 'PayTsek',
        user: mongoose.Types.ObjectId(),
      });

      let res = await await request(app)
        .get(`${url}/invalid`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'No Company, access denied',
      });

      res = await request(app)
        .get(`${url}/${company.slug}`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'Not authorize to access this route',
      });
    });
  });

  describe('Success Response', () => {
    it('should return success response if valid slug', async () => {
      const token = await global.signIn();
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await Company.create({ name: 'payTsek', user: user._id });

      const res = await request(app)
        .get(`${url}/${company.slug}`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBeTruthy();
      expect(res.body.tenant).toMatchObject({
        slug: company.slug,
        id: company._id.toString(),
      });
    });

    it('should return success response if user is an admin', async () => {
      const token = await global.signInAdmin();
      const company = await Company.create({
        name: 'payTsek',
        user: mongoose.Types.ObjectId(),
      });

      const res = await request(app)
        .get(`${url}/paytsek`)
        .set({ 'x-company-tenant': company.slug })
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBeTruthy();
      expect(res.body.tenant).toMatchObject({
        slug: 'paytsek',
        id: company._id.toString(),
      });
    });
  });
});
