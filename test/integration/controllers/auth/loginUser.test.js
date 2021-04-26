const jwt = require('jsonwebtoken');
const request = require('supertest');

const app = require('../../../../app');
const TestUtils = require('../../../../utils/testUtils');

const createUser = async () => {
  await TestUtils.createUser({
    username: 'darryl pogi',
    email: 'darrylpogi@gmail.com',
    password: '123456',
    firstName: 'Darryl',
    lastName: 'Mangibin',
  });
};

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
