const request = require('supertest');
const app = require('../../../app');
const Company = require('../../../models/Company');

describe('POST /api/v1/company/name - createCompany', () => {
	const url = '/api/v1/company/name';

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
		const { body } = await request(app)
			.post(url)
      .send({ name: 'Pay Tsek' });
      
    expect(body.company.slug).toMatch(/pay-tsek/)
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
