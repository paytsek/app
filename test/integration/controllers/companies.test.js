const request = require('supertest');
const app = require('../../../app');
const Company = require('../../../models/Company');

describe('POST /api/v1/companies/name - createCompany', () => {
	const url = '/api/v1/companies/name';

	it('should return 201 status code and success response if name is invalid', async () => {
		const { status, body } = await request(app)
			.post(url)
			.send({ name: 'PayTsek' });

		expect(status).toBe(201);
		expect(body.success).toBeTruthy();
		expect(body.company).toHaveProperty(
			'_id',
			body.company._id,
			'name',
			'PayTsek'
		);
	});

	it('should generate a slug when saving a company name', async () => {
		const { body } = await request(app).post(url).send({ name: 'Pay Tsek' });

		expect(body.company.slug).toMatch(/pay-tsek/);
	});

	it('should return 400 status code and error response if name is empty', async () => {
		const { status, body } = await request(app).post(url).send({ name: '' });

		expect(status).toBe(400);
		expect(body.success).toBeFalsy();
		expect(body.errors).toHaveProperty('name', 'Company name is required');
	});

	it('should return 400 status code and error response if name already exist', async () => {
		await Company.create({ name: 'PayTsek' });
		const { status, body } = await request(app)
			.post(url)
			.send({ name: 'PayTsek' });

		expect(status).toBe(400);
		expect(body.success).toBeFalsy();
		expect(body.errors).toHaveProperty('name', 'PayTsek is already exist');
	});
});

describe('GET api/v1/companies', () => {
	const url = '/api/v1/companies';

	it('should get all companies and 200 status code', async () => {
		await Company.create([{ name: 'PayTsek' }, { name: 'Fullsuite' }]);

		const { status, body } = await request(app).get(url);

		expect(status).toBe(200);
		expect(body.success).toBeTruthy();
		expect(body.companies.length).toEqual(2);
		expect(body.companies).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ name: 'PayTsek' }),
				expect.objectContaining({ name: 'Fullsuite' }),
			])
		);
	});
});

describe('GET /api/v1/companies/:id - single company', () => {
	const url = '/api/v1/companies';

	it('should return 200 status and get a company by id', async () => {
		const company = await Company.create({ name: 'PayTsek' });

		const { status, body } = await request(app).get(`${url}/${company._id}`);

		expect(status).toBe(200);
		expect(body.success).toBeTruthy();
		expect(body.company).toEqual(
			expect.objectContaining({
				name: 'PayTsek',
				slug: 'paytsek',
				_id: company._id.toString(),
			})
		);
	});
});

describe('POST /api/v1/companies/:id/settings', () => {
	describe('return 400 status code and error response', () => {
		const url = '/api/v1/companies';
		let company;

		beforeEach(async () => {
			company = await Company.create({ name: 'PayTsek' });
		});

		it('should return error 1st and 2nd cutoff and 1st and 2nd payout is empty and frequency is semiMonthly', async () => {
			const { status, body } = await request(app)
				.post(`${url}/${company._id}/settings`)
				.send({ frequency: 'semiMonthly' });

			expect(status).toBe(400);
			expect(body.errors.success).toBeFalsy();
			expect(body.errors).toMatchObject({
				secondPayout: 'Second Payout is required',
				firstPayout: 'First Payout is required',
				secondCutOff: 'Second Cut Off is required',
				firstCutOff: 'First Cut Off is required',
			});
		});

		it('should return error 1st cutoff and 1st payout is empty and frequency is monthly', async () => {
			const { status, body } = await request(app)
				.post(`${url}/${company._id}/settings`)
				.send({ frequency: 'monthly' });

			expect(status).toBe(400);
			expect(body.success).toBeFalsy();
			expect(body.errors).toMatchObject({
				firstPayout: 'First Payout is required',
				firstCutOff: 'First Cut Off is required',
			});
		});

		it('should return error if required fields are empty', async () => {
			const { status, body } = await request(app)
				.post(`${url}/${company._id}/settings`)
				.send({
					frequency: 'monthly',
					firstCutOff: '1',
					firstPayout: '15',
					category: '',
					reportingBase: '',
					nightDifferential: '',
				});

			expect(status).toBe(400);
			expect(body.success).toBeFalsy();
			expect(body.errors).toMatchObject({
				category: 'Category is Required',
				reportingBase: 'Reporting base is required',
				nightDifferential: 'Nigth differential is required',
			});
		});

		it('should return error if nightDifferential is percentage and nightDifferentialPercentage is empty', async () => {
			const { status, body } = await request(app)
				.post(`${url}/${company._id}/settings`)
				.send({
					frequency: 'monthly',
					firstCutOff: '1',
					firstPayout: '15',
					nightDifferential: 'percentage',
					nightDifferentialPercentage: '',
				});

			expect(status).toBe(400);
			expect(body.success).toBeFalsy();
			expect(body.errors).toMatchObject({
				nightDifferentialPercentage:
					'Night Differential Percentage is required',
			});
		});

		it('should return error if overtime is hourly and overtimePay and overtimeRestDayPay is empty', async () => {
			const { status, body } = await request(app)
				.post(`${url}/${company._id}/settings`)
				.send({
					frequency: 'monthly',
					firstCutOff: '1',
					firstPayout: '15',
					overtime: 'hourly',
					overtimePay: '',
					overtimeRestDayPay: '',
				});

			expect(status).toBe(400);
			expect(body.success).toBeFalsy();
			expect(body.errors).toMatchObject({
				overtimePay: 'Overtime Pay is required',
				overtimeRestDayPay: 'Overtime Rest Day Pay is required',
			});
		});

		it('should return error if holiday is true and regularHolidayPay and regularHolidayPay and specialHolidayPay', async () => {
			const { status, body } = await request(app)
				.post(`${url}/${company._id}/settings`)
				.send({
					frequency: 'monthly',
					firstCutOff: '1',
					firstPayout: '15',
					holiday: true,
					regularHolidayPay: '',
					specialHolidayPay: '',
				});

			expect(status).toBe(400);
			expect(body.success).toBeFalsy();
			expect(body.errors).toMatchObject({
				regularHolidayPay: 'Regular Holiday Pay is required',
				specialHolidayPay: 'Special Holiday Pay is required',
			});
		});
	});

	describe('return 201 status code and succcess response', () => {
		const url = '/api/v1/companies';
		let company;

		beforeEach(async () => {
			company = await Company.create({ name: 'PayTsek' });
		});

		it('should return success reponse if values are valid', async () => {
			const { status, body } = await request(app)
				.post(`${url}/${company._id}/settings`)
				.send({
					tin: '18471950195',
					rdoCode: '583850181',
					registeredAddress: {
						street: '11g Marcoville St',
						city: 'Baguio city',
						country: 'Philippines',
						zipCode: '2600',
					},
					telephoneNumber: '4710571094',
					category: 'government',
					frequency: 'semiMonthly',
					firstCutOff: '30',
					firstPayout: '5',
					secondCutOff: '15',
					secondPayout: '20',
					reportingBase: 'payoutDates',
					nightDifferential: 'percentage',
					nightDifferentialPercentage: '0.4',
					overtime: 'hourly',
					overtimeRestDayPay: 0.5,
					holiday: true,
					regularHoliday: 1.2,
					specialHoliday: 1.5,
					deminimis: true,
					emailNotification: true,
					hideEmployeeList: false,
					atcCodes: '483858501057',
					sssRegistrationNumber: '837401053',
					phicNumber: '583859105748',
					hdmfNumber: '5783010574',
					payItemsWithCorrespondingAccountExpense: 'TODO',
					companyTaxablePays: ['beer', 'yosi'],
					companyNonTaxablePays: ['food', 'snacks'],
					sssCalculation: {
						deminimis: true,
						taxablePays: {
							beer: true,
							yosi: false,
						},
						nonTaxablePays: {
							food: false,
							snacks: true,
						},
					},
					phicCalculation: {
						deminimis: false,
						taxablePays: {
							beer: false,
							yosi: true,
						},
						nonTaxablePays: {
							food: true,
							snacks: true,
						},
					},
					thirtheenthMonthPayCalculation: {
						deminimis: true,
						absences: true,
						taxablePays: {
							beer: true,
							yosi: true,
						},
						nonTaxablePays: {
							food: false,
							snacks: false,
						},
					},
					departments: ['staff', 'managers', 'seniors'],
					accountingJournal: {
						deminimisBenefits: 'wagesAndSalaries',
						employeeBenefits: 'wagesAndSalaries',
						hdmfPayable: 'wagesAndSalaries',
						netPay: 'wagesAndSalaries',
						nonTaxableCompensation: 'wagesAndSalaries',
						phicPayable: 'wagesAndSalaries',
						postTaxDeduction: 'wagesAndSalaries',
						preTaxDeduction: 'wagesAndSalaries',
						reimbursement: 'wagesAndSalaries',
						sssPayable: 'wagesAndSalaries',
						taxDue: 'wagesAndSalaries',
						taxableCompensation: 'wagesAndSalaries',
						thritheethMonthPay: 'wagesAndSalaries',
					},
				});

			expect(status).toBe(201);
			expect(body.success).toBeTruthy();
			expect(body.companySettings).toHaveProperty(
				'_id',
				body.companySettings._id
			);
		});
	});
});
