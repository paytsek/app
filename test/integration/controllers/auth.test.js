const jwt = require('jsonwebtoken');
const request = require('supertest');
const app = require('../../../app');
const User = require('../../../models/User');

const createUser = async () => {
  await User.create({
    username: 'darryl pogi',
    email: 'darrylpogi@gmail.com',
    password: '123456',
    firstName: 'Darryl',
    lastName: 'Mangibin',
  });
};

describe('POST /api/v1/auth/register - registerUser', () => {
  const url = '/api/v1/auth/register';

  describe('Error Response', () => {
    it('should return error response if fields are empty', async () => {
      const { status, body } = await request(app).post(url).send({
        username: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
      });

      expect(status).toBe(400);
      expect(body.success).toBeFalsy();
      expect(body.errors).toMatchObject({
        username: 'Username is required',
        email: 'Email is required',
        password: 'Password is required',
        firstName: 'First name is required',
        lastName: 'Last name is required',
      });
    });

    it('should return error response if username is invalid', async () => {
      let res;
      res = await request(app).post(url).send({
        username: 'da',
        email: 'darryl@gmail.com',
        password: '123456',
        firstName: 'Darryl',
        lastName: 'Mangibin',
      });

      expect(res.status).toBe(400);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toHaveProperty(
        'username',
        'Username must atleast 3 characters',
      );

      const name = Array(122).join('a');

      res = await request(app).post(url).send({
        username: name,
        email: 'darryl@gmail.com',
        password: '123456',
        firstName: 'darryl',
        lastName: 'Mangibin',
      });

      expect(res.status).toBe(400);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toHaveProperty(
        'username',
        'Username must not exceed to 120 characters',
      );
    });

    it('should return error response if password is invalid', async () => {
      const res = await request(app).post(url).send({
        username: 'darryl mangibin',
        email: 'darryl@gmail.com',
        password: '12345',
        firstName: 'Darryl',
        lastName: 'Mangibin',
      });

      expect(res.status).toBe(400);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toHaveProperty(
        'password',
        'Password must atleast 6 characters',
      );
    });

    it('should return error response if email is invalid', async () => {
      let res;

      res = await request(app).post(url).send({
        username: 'darryl mangibin',
        password: '123456',
        email: 'darrylpogi',
        firstName: 'darryl',
        lastName: 'mangibin',
      });

      expect(res.status).toBe(400);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toHaveProperty('email', 'Email is invalid');

      await createUser();

      res = await request(app).post(url).send({
        username: 'darryl cute',
        password: '12345678',
        email: 'darrylpogi@gmail.com',
        firstName: 'darryl cute',
        lastName: 'Mangibin',
      });

      expect(res.status).toBe(400);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toHaveProperty('email', 'Email already exist');
    });
  });

  describe('Success Response', () => {
    it('should return 201 status code and success response', async () => {
      const res = await request(app).post(url).send({
        username: 'darryl cute',
        email: 'darrylcute@gmail.com',
        password: '123456',
        firstName: 'Darryl',
        lastName: 'Mangibin',
      });

      expect(res.status).toBe(201);
      expect(res.body.success).toBeTruthy();
      expect(res.body).toHaveProperty('token', res.body.token);

      const user = jwt.verify(res.body.token, process.env.JWT_SECRET_KEY);

      expect(Object.keys(user)).toEqual(
        expect.arrayContaining(['_id', 'email', 'username', 'iat', 'exp']),
      );
      expect(user).toEqual(
        expect.objectContaining({ username: 'darryl cute' }),
        expect.objectContaining({ email: 'darrylcute@gmail.com' }),
      );
    });
  });
});

describe('POST /api/v1/auth/login - loginUser', () => {
  const url = '/api/v1/auth/login';

  describe('Error Response', () => {
    it('should have 400 status code if email and password is empty', async () => {
      const res = await request(app).post(url).send({ email: '', password: '' });

      expect(res.status).toBe(400);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toHaveProperty(
        'message',
        'Please provide an email and password',
      );
    });

    it('should have 400 status code if email is not existing in database', async () => {
      await createUser();

      const res = await request(app)
        .post(url)
        .send({ email: 'darryl@gmail.com', password: '123456' });

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toHaveProperty('message', 'Invalid credentials');
    });

    it('should have 400 status code if password is incorrect', async () => {
      await createUser();

      const res = await request(app)
        .post(url)
        .send({ email: 'test@example.com', password: '1234567' });

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toHaveProperty('message', 'Invalid credentials');
    });
  });

  describe('Success Response', () => {
    it('should return a token if login is successful', async () => {
      await createUser();

      const res = await request(app)
        .post(url)
        .send({ email: 'darrylpogi@gmail.com', password: '123456' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBeTruthy();
      expect(Object.keys(res.body)).toEqual(expect.arrayContaining(['token']));

      const user = jwt.verify(res.body.token, process.env.JWT_SECRET_KEY);

      expect(Object.keys(user)).toEqual(
        expect.arrayContaining(['_id', 'email', 'username', 'iat', 'exp']),
      );
      expect(user).toMatchObject({
        username: 'darryl pogi',
        email: 'darrylpogi@gmail.com',
      });
    });
  });
});

describe('GET /api/v1/auth - authUser', () => {
  const url = '/api/v1/auth';

  describe('Error Response', () => {
    it('should return an error response if token is invalid', async () => {
      let res = await request(app).get(url);

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'No token, access denied',
      });

      res = await request(app).get(url).auth('token123', { type: 'bearer' });

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'Not authorize to access this route',
      });
    });
  });

  describe('Success Response', () => {
    it('should return a success response if token is valid', async () => {
      const token = await global.signIn();

      const res = await request(app).get(url).auth(token, { type: 'bearer' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBeTruthy();
      expect(Object.keys(res.body.user)).toEqual(
        expect.arrayContaining([
          'id',
          'email',
          'role',
          'firstName',
          'lastName',
          'fullName',
        ]),
      );
    });
  });
});
