const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const request = require('supertest');

const app = require('../../../../app');
const TestUtils = require('../../../../utils/testUtils');

describe('PUT /api/v1/companies/:id/settings/:companySettingsId - updateCompanySettings', () => {
  const url = '/api/v1/companies/settings';
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
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'No token, access denied',
      });
    });

    it('should return error if company not own by the logged in user', async () => {
      const user = await TestUtils.createUser({
        username: 'rodrigocarlos',
        email: 'rodrigo@gmail.com',
        password: '123456',
        firstName: 'Rodrigo',
        lastName: 'Carlos',
      });
      const owner = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await TestUtils.createCompany({
        name: 'PayTsek',
        user: user._id,
        administrators: [owner._id],
      });

      const res = await request(app)
        .put(`${url}/${mongoose.Types.ObjectId().toHexString()}`)
        .set(TestUtils.responseSetObject(company.slug))
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'Not authorized to access this route',
      });
    });

    it('should return error if no company slug or invalid', async () => {
      const res = await request(app)
        .put(`${url}/${mongoose.Types.ObjectId().toHexString()}`)
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'No tenant, access denied',
      });
    });

    it('should return error if company does not have settings created', async () => {
      const loggedInUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const companySettingsId = mongoose.Types.ObjectId().toHexString();
      const company = await TestUtils.createCompany({
        name: 'PayTsek',
        user: loggedInUser._id,
        administrators: [loggedInUser._id],
      });

      const res = await request(app)
        .put(`${url}/${companySettingsId}`)
        .set(TestUtils.responseSetObject(company.slug))
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(404);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: `Resource with an id of ${companySettingsId} not found`,
      });
    });

    it('should return error response when invalid values are entered', async () => {
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await TestUtils.createCompany({
        name: 'PayTsek',
        user: user._id,
        administrators: [user._id],
      });
      const companySettings = await TestUtils.createCompanySetting({
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
        departments: [mongoose.Types.ObjectId().toHexString()],
      });

      const res = await request(app)
        .put(`${url}/${companySettings._id}`)
        .set(TestUtils.responseSetObject(company.slug))
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
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await TestUtils.createCompany({
        name: 'PayTsek',
        user: user._id,
        administrators: [user._id],
      });
      const companySettings = await TestUtils.createCompanySetting({
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
        departments: [mongoose.Types.ObjectId().toHexString()],
      });

      const res = await request(app)
        .put(`${url}/${companySettings._id}`)
        .auth(token, { type: 'bearer' })
        .set(TestUtils.responseSetObject(company.slug))
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
    it('should return success reponse if entered values are valid', async () => {
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const company = await TestUtils.createCompany({
        name: 'PayTsek',
        user: user._id,
        administrators: [user._id],
      });
      const companySettings = await TestUtils.createCompanySetting({
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
        departments: [mongoose.Types.ObjectId().toHexString()],
      });

      const taxablePayId = mongoose.Types.ObjectId().toHexString();
      const nonTaxablePayId = mongoose.Types.ObjectId().toHexString();

      const res = await request(app)
        .put(`${url}/${companySettings._id}`)
        .auth(token, { type: 'bearer' })
        .set(TestUtils.responseSetObject(company.slug))
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
          departments: [
            mongoose.Types.ObjectId().toHexString(),
            mongoose.Types.ObjectId().toHexString(),
          ],
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
