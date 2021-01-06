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
