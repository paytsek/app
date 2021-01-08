const request = require('supertest');
const app = require('../../../app');
const Company = require('../../../models/Company');
const User = require('../../../models/User');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

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

	it('should return 201 status code and success response if name is invalid', async () => {
		const token = await global.signIn();

		const res = await request(app)
			.post(url)
			.auth(token, { type: 'bearer' })
			.send({ name: 'PayTsek' });

		expect(res.status).toBe(201);
		expect(res.body.success).toBeTruthy();
		expect(res.body.company).toHaveProperty(
			'_id',
			res.body.company._id,
			'name',
			'PayTsek'
		);
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
		expect(body.errors).toHaveProperty('name', 'PayTsek is already exist');
	});
});

describe('GET api/v1/companies - getCompanies', () => {
	const url = '/api/v1/companies';

	it('should get all companies and 200 status code', async () => {
		await Company.create([
			{ name: 'PayTsek', user: mongoose.Types.ObjectId() },
			{ name: 'Fullsuite', user: mongoose.Types.ObjectId() },
		]);

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

describe('GET /api/v1/companies/:id - getCompany', () => {
	const url = '/api/v1/companies';

	it('should return 200 status and get a company by id', async () => {
		const company = await Company.create({
			name: 'PayTsek',
			user: mongoose.Types.ObjectId(),
		});

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

describe('POST /api/v1/companies/:id/settings - createCompanySettings', () => {
	const url = '/api/v1/companies';

	it('should return 400 Not found and error response if company is invalid or not found', async () => {
		const token = await global.signIn();

		const id = mongoose.Types.ObjectId();

		const res = await request(app)
			.post(`${url}/${id}/settings`)
			.auth(token, { type: 'bearer' });

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

		const res = await request(app)
			.post(`${url}/${company._id}/settings`)
			.send({});

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
      firstName: "Jane",
      lastName: "Doe"
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
			});

		expect(res.status).toBe(201);
		expect(res.body.success).toBeTruthy();
		expect(Object.keys(res.body.companySettings)).toEqual(
			expect.arrayContaining(['_id'])
		);
	});
});
