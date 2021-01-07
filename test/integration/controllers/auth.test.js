const request = require('supertest');
const app = require('../../../app');
const User = require('../../../models/User');
const jwt = require('jsonwebtoken');

describe('POST /api/v1/auth/register', () => {
	const url = '/api/v1/auth/register';
	describe('return 400 bad request and error response', () => {
		it('should return error response if fields are empty', async () => {
			const { status, body } = await request(app).post(url).send({
				username: '',
				email: '',
				password: '',
			});

			expect(status).toBe(400);
			expect(body.success).toBeFalsy();
			expect(body.errors).toMatchObject({
				username: 'Username is required',
				email: 'Email is required',
				password: 'Password is required',
			});
		});

		it('should return error response if username is invalid', async () => {
			let res;
			res = await request(app).post(url).send({
				username: 'da',
				email: 'darryl@gmail.com',
				password: '123456',
			});

			expect(res.status).toBe(400);
			expect(res.body.success).toBeFalsy();
			expect(res.body.errors).toHaveProperty(
				'username',
				'Username must atleast 3 characters'
			);

			const name = Array(122).join('a');

			res = await request(app).post(url).send({
				username: name,
				email: 'darryl@gmail.com',
				password: '123456',
			});

			expect(res.status).toBe(400);
			expect(res.body.success).toBeFalsy();
			expect(res.body.errors).toHaveProperty(
				'username',
				'Username must not exceed to 120 characters'
			);
		});

		it('should return error response if password is invalid', async () => {
			const res = await request(app).post(url).send({
				username: 'darryl mangibin',
				email: 'darryl@gmail.com',
				password: '12345',
			});

			expect(res.status).toBe(400);
			expect(res.body.success).toBeFalsy();
			expect(res.body.errors).toHaveProperty(
				'password',
				'Password must atleast 6 characters'
			);
		});

		it('should return error response if email is invalid', async () => {
			let res;

			res = await request(app).post(url).send({
				username: 'darryl mangibin',
				password: '123456',
				email: 'darrylpogi',
			});

			expect(res.status).toBe(400);
			expect(res.body.success).toBeFalsy();
			expect(res.body.errors).toHaveProperty('email', 'Email is invalid');

			await User.create({
				username: 'darryl pogi',
				email: 'darrylpogi@gmail.com',
				password: '123456',
			});

			res = await request(app).post(url).send({
				username: 'darryl cute',
				password: '12345678',
				email: 'darrylpogi@gmail.com',
			});

			expect(res.status).toBe(400);
			expect(res.body.success).toBeFalsy();
			expect(res.body.errors).toHaveProperty('email', 'Email already exist');
		});
	});

	describe('return success response', () => {
		it('should return 201 status code and success response', async () => {
			const res = await request(app).post(url).send({
				username: 'darryl cute',
				email: 'darrylcute@gmail.com',
				password: '123456',
			});

			expect(res.status).toBe(201);
			expect(res.body.success).toBeTruthy();
			expect(res.body).toHaveProperty('token', res.body.token);

			const user = jwt.verify(res.body.token, process.env.JWT_SECRET_KEY);

			expect(Object.keys(user)).toEqual(
				expect.arrayContaining(['id', 'email', 'username', 'iat', 'exp'])
			);
			expect(user).toEqual(
				expect.objectContaining({ username: 'darryl cute' }),
				expect.objectContaining({ email: 'darrylcute@gmail.com' })
			);
		});
	});
});

describe('POST /api/v1/auth/login', () => {
	const url = '/api/v1/auth/login';

	describe('return error response', () => {
		it('should have 400 status code if email and password is empty', async () => {
			const res = await request(app)
				.post(url)
				.send({ email: '', password: '' });

			expect(res.status).toBe(400);
			expect(res.body.success).toBeFalsy();
			expect(res.body.errors).toHaveProperty(
				'message',
				'Please provide an email and password'
			);
		});

		it('should have 400 status code if email is not existing in database', async () => {
			await User.create({
				email: 'test@example.com',
				password: '123456',
				username: 'darryl mangibin',
			});

			const res = await request(app)
				.post(url)
				.send({ email: 'darryl@gmail.com', password: '123456' });

			expect(res.status).toBe(401);
			expect(res.body.success).toBeFalsy();
			expect(res.body.errors).toHaveProperty('message', 'Invalid credentials');
		});

		it('should have 400 status code if password is incorrect', async () => {
			await User.create({
				username: 'darryl mangibin',
				password: '123456',
				email: 'test@example.com',
			});

			const res = await request(app)
				.post(url)
				.send({ email: 'test@example.com', password: '1234567' });

			expect(res.status).toBe(401);
			expect(res.body.success).toBeFalsy();
			expect(res.body.errors).toHaveProperty('message', 'Invalid credentials');
		});

		it('should return a token if login is successful', async () => {
			await User.create({
				username: 'darryl mangibin',
				email: 'test@example.com',
				password: '123456',
			});

			const res = await request(app)
				.post(url)
				.send({ email: 'test@example.com', password: '123456' });

			expect(res.status).toBe(200);
			expect(res.body.success).toBeTruthy();
			expect(Object.keys(res.body)).toEqual(expect.arrayContaining(['token']));

			const user = jwt.verify(res.body.token, process.env.JWT_SECRET_KEY);

			expect(Object.keys(user)).toEqual(
				expect.arrayContaining(['id', 'email', 'username', 'iat', 'exp'])
			);
			expect(user).toMatchObject({
				username: 'darryl mangibin',
				email: 'test@example.com',
			});
		});
	});
});
