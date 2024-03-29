const jwt = require('jsonwebtoken');
const request = require('supertest');

const app = require('../../../../app');
const User = require('../../../../models/User');

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

      await User.create({
        username: 'darryl pogi',
        email: 'darrylpogi@gmail.com',
        password: '123456',
        firstName: 'Darryl',
        lastName: 'Mangibin',
      });

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
