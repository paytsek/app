const request = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const app = require('../../../app');
const User = require('../../../models/User');

describe('GET /api/v1/users', () => {
	const url = '/api/v1/users';

	it('should return 401 status code and error response if authorization is empty or invalid', async () => {
		let res = await request(app).get(url).auth('', { type: 'bearer' });

		expect(res.status).toBe(401);
		expect(res.body.success).toBeFalsy();
		expect(res.body.errors).toMatchObject({
			message: 'No token, access denied',
		});

		const payload = {
			id: mongoose.Types.ObjectId(),
		};

		const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
			expiresIn: 3600,
		});

		res = await request(app).get(url).auth(token, { type: 'bearer' });

		expect(res.status).toBe(401);
		expect(res.body.success).toBeFalsy();
		expect(res.body.errors).toMatchObject({
			message: 'No user, access denied',
		});
	});

	it('should return 200 status code and success response if logged in', async () => {
		const token = await global.signIn();

		await User.create({
			username: 'Carlos Rodrigo',
			email: 'rodrigo@gmail.com',
			password: '123456',
		});

		const res = await request(app).get(url).auth(token, { type: 'bearer' });

		expect(res.status).toBe(200);
		expect(res.body.success).toBeTruthy();
		expect(res.body.users.length).toBe(2);

		const loggedInUser = jwt.verify(token, process.env.JWT_SECRET_KEY);

		const users = res.body.users.map((user) => user.username);

		expect(users).toEqual(
			expect.arrayContaining(['Carlos Rodrigo', loggedInUser.username])
		);
	});
});

describe('GET /api/v1/users/:id', () => {
	const url = '/api/v1/users';

	it('should return 401 status code and error response if not logged in', async () => {
		const res = await request(app).get(`${url}/${mongoose.Types.ObjectId()}`);

		expect(res.status).toBe(401);
		expect(res.body.success).toBeFalsy();
		expect(res.body.errors).toMatchObject({
			message: 'No token, access denied',
		});
	});

	it('should return 404 is id is not found or invalid', async () => {
		const token = await global.signIn();

		const id = mongoose.Types.ObjectId();

		let res = await request(app)
			.get(`${url}/${id}`)
			.auth(token, { type: 'bearer' });

		expect(res.status).toBe(404);
		expect(res.body.success).toBeFalsy();
		expect(res.body.errors).toMatchObject({
			message: `Resource with an id of ${id} not found`,
		});

		const invalidObjectId = '1491nv94';

		res = await request(app)
			.get(`${url}/${invalidObjectId}`)
			.auth(token, { type: 'bearer' });

		expect(res.status).toBe(404);
		expect(res.body.success).toBeFalsy();
		expect(res.body.errors).toMatchObject({
			message: `Resource with an id of ${invalidObjectId} not found`,
		});
	});

	it('should return 200 success reponse if id is valid', async () => {
		const token = await global.signIn();

		const user = await User.create({
			username: 'Rodrigo Carlos',
			email: 'rodrigo@gmail.com',
			password: '123456',
		});

		const res = await request(app)
			.get(`${url}/${user._id}`)
			.auth(token, { type: 'bearer' });

		expect(res.status).toBe(200);
		expect(res.body.success).toBeTruthy();
		expect(res.body.user).toHaveProperty(
			'_id',
			user._id,
			'username',
			user.username,
			'email',
			user.email
		);
	});
});
