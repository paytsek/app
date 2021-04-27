const request = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const app = require('../../../app');
const User = require('../../../models/User');

describe('GET /api/v1/users/current-user - getCurrentUser', () => {
  const url = '/api/v1/users/current-user';

  it('should return 401 if not logged in', async () => {
    const res = await request(app).get(url);

    expect(res.status).toBe(401);
    expect(res.body.success).toBeFalsy();
    expect(res.body.errors).toMatchObject({
      message: 'No token, access denied',
    });
  });

  it('should get the current user if logged in', async () => {
    const token = await global.signIn();

    const res = await request(app).get(url).auth(token, { type: 'bearer' });
    const currentUser = jwt.verify(token, process.env.JWT_SECRET_KEY);

    expect(res.status).toBe(200);
    expect(res.body.success).toBeTruthy();
    expect(res.body.user._id).toEqual(currentUser._id);
  });
});

describe('PUT /api/v1/users/current-user - updateCurrentUser', () => {
  const url = '/api/v1/users/current-user';

  it('should validate fields and return error response', async () => {
    const token = await global.signIn();

    await User.create({
      username: 'rodrigo carlos',
      email: 'rodrigo@gmail.com',
      password: '123456',
      firstName: 'Rodrigo',
      lastName: 'Carlost',
    });

    let res = await request(app).put(url).auth(token, { type: 'bearer' }).send({});

    expect(res.status).toBe(400);
    expect(res.body.success).toBeFalsy();
    expect(res.body.errors).toEqual(
      expect.objectContaining({
        username: 'Username is required',
        email: 'Email is required',
        firstName: 'First name is required',
        lastName: 'Last name is required',
      }),
    );

    res = await request(app).put(url).auth(token, { type: 'bearer' }).send({
      username: 'rodrigo carlos',
      email: 'rodrigo@gmail.com',
      firstName: 'Rods',
      lastName: 'Carls',
    });

    expect(res.status).toBe(400);
    expect(res.body.success).toBeFalsy();
    expect(res.body.errors).toMatchObject({
      username: 'Username already exist',
      email: 'Email already exist',
    });
  });

  it('should successfully update current user', async () => {
    const token = await global.signIn();

    const loggedInUser = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const res = await request(app).put(url).auth(token, { type: 'bearer' }).send({
      username: 'rodrigo pogi',
      email: 'rodrigo@cute.com',
      firstName: 'Rodrigo',
      lastName: 'Carlos',
    });

    expect(res.status).toBe(200);
    expect(res.body.success).toBeTruthy();
    expect(res.body.user._id).toEqual(loggedInUser._id);
    expect(res.body.user).not.toEqual(
      expect.objectContaining({
        username: loggedInUser.username,
        email: loggedInUser.email,
        firstName: loggedInUser.firstName,
        lastName: loggedInUser.lastName,
      }),
    );
    expect(res.body.user).toMatchObject({
      username: 'rodrigo pogi',
      email: 'rodrigo@cute.com',
      firstName: 'Rodrigo',
      lastName: 'Carlos',
    });
  });
});

describe('PUT /api/v1/users/current-user/password - updateCurrentUserPassword', () => {
  const url = '/api/v1/users/current-user/password';
  let loggedInUser;
  let payload;

  beforeEach(async () => {
    loggedInUser = await User.create({
      username: 'rodrigo carlos',
      password: '123456',
      email: 'rodrigo@gmail.com',
      firstName: 'Rodrigo',
      lastName: 'Carlos',
    });
    payload = {
      _id: loggedInUser._id,
      email: loggedInUser.email,
      username: loggedInUser.username,
      firstName: loggedInUser.firstName,
      lastName: loggedInUser.lastName,
    };
  });

  describe('Error response', () => {
    it('should return return 401 if not logged in or no token', async () => {
      const res = await request(app).put(url);

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'No token, access denied',
      });
    });

    it('should return 400 if fields are empty', async () => {
      const token = await global.signIn(payload);
      const res = await request(app).put(url).auth(token, { type: 'bearer' }).send({});

      expect(res.status).toBe(400);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'Please fill all fields',
      });
    });

    it('should have an error if new password and password confirmation is mismatch', async () => {
      const token = await global.signIn(payload);
      const res = await request(app).put(url).auth(token, { type: 'bearer' }).send({
        currentPassword: '123456',
        newPassword: '1234567',
        confirmPassword: '12345678',
      });

      expect(res.status).toBe(400);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'New password and confirmation password mismatch',
      });
    });

    it('should have error if current password entered is mismatch from the logged in current password', async () => {
      const token = await global.signIn(payload);
      const res = await request(app).put(url).auth(token, { type: 'bearer' }).send({
        currentPassword: '1234566',
        newPassword: '1234567',
        confirmPassword: '1234567',
      });

      expect(res.status).toBe(400);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({ message: 'Invalid password' });
    });
  });

  describe('Success response', () => {
    it('should return a success response if fields are valid', async () => {
      const token = await global.signIn(payload);
      const res = await request(app).put(url).auth(token, { type: 'bearer' }).send({
        currentPassword: '123456',
        newPassword: '1234567',
        confirmPassword: '1234567',
      });

      expect(res.status).toBe(200);
      expect(res.body.success).toBeTruthy();
      expect(res.body.user).toEqual(
        expect.objectContaining({
          _id: loggedInUser._id.toString(),
          username: 'rodrigo carlos',
          email: 'rodrigo@gmail.com',
          firstName: 'Rodrigo',
          lastName: 'Carlos',
          fullName: 'Rodrigo Carlos',
        }),
      );
    });
  });
});

describe('DELETE /api/users/current-user - deleteCurrentUser', () => {
  const url = '/api/v1/users/current-user';
  let loggedInUser;
  let payload;

  beforeEach(async () => {
    loggedInUser = await User.create({
      username: 'rodrigo carlos',
      password: '123456',
      email: 'rodrigo@gmail.com',
      firstName: 'Rodrigo',
      lastName: 'Carlos',
    });
    payload = {
      _id: loggedInUser._id,
      email: loggedInUser.email,
      username: loggedInUser.username,
      firstName: loggedInUser.firstName,
      lastName: loggedInUser.lastName,
    };
  });

  describe('Error Response', () => {
    it('should return 401 Unauthorized if not logged in', async () => {
      const res = await request(app).delete(url);

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'No token, access denied',
      });
    });

    it('should return error response if password is empty', async () => {
      const token = await global.signIn(payload);
      const res = await request(app)
        .delete(url)
        .auth(token, { type: 'bearer' })
        .send({ password: '' });

      expect(res.status).toBe(400);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'Please enter your password',
      });
    });

    it('should return error response if password and confirmPassword mismatch', async () => {
      const token = await global.signIn();
      const res = await request(app).delete(url).auth(token, { type: 'bearer' }).send({
        password: '1234567',
        confirmPassword: '123456',
      });

      expect(res.status).toBe(400);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'Entered Password and password confirmation mismatch',
      });
    });

    it('should return error response if current password and password entered mismatch', async () => {
      const token = await global.signIn();
      const res = await request(app).delete(url).auth(token, { type: 'bearer' }).send({
        password: '1234567',
        confirmPassword: '1234567',
      });

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'Invalid password',
      });
    });
  });

  describe('Success Response', () => {
    it('should return a success response if values entered are valid', async () => {
      const token = await global.signIn();
      const res = await request(app).delete(url).auth(token, { type: 'bearer' }).send({
        password: '123456',
        confirmPassword: '123456',
      });

      expect(res.status).toBe(200);
      expect(res.body.success).toBeTruthy();
      expect(Object.keys(res.body.user).length).toEqual(0);
      expect(res.body).toEqual(expect.objectContaining({ message: 'User successfully deleted' }));
    });
  });
});

describe('DELETE /api/users/:id deleteUser', () => {
  const url = '/api/v1/users';
  let admin;
  let payload;
  let user;

  beforeEach(async () => {
    admin = await User.create({
      username: 'darryl',
      email: 'darryl@gmail.com',
      password: '123456',
      firstName: 'Darryl',
      lastName: 'Mangibin',
      role: 'admin',
    });
    user = await User.create({
      username: 'rodrigo',
      email: 'rodrigo@gmail.com',
      password: '123456',
      firstName: 'rodrigo',
      lastName: 'carlos',
      role: 'member',
    });
    payload = {
      _id: admin._id,
      email: admin.email,
      username: admin.username,
      firstName: admin.firstName,
      lastName: admin.lastName,
    };
  });

  describe('Error Response', () => {
    it('should return an error response if id is invalid or not found', async () => {
      const invalidId = mongoose.Types.ObjectId();
      const token = await global.signIn(payload);

      const res = await request(app).delete(`${url}/${invalidId}`).auth(token, { type: 'bearer' });

      expect(res.status).toBe(400);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: `Resource with an id of ${invalidId} not found`,
      });
    });

    it('should return an error response if not logged in', async () => {
      const res = await request(app).delete(`${url}/${mongoose.Types.ObjectId()}`);

      expect(res.status).toBe(401);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({ message: 'No token, access denied' });
    });

    it('should return an error if password or fields are invalid', async () => {
      const token = await global.signIn(payload);

      let res = await request(app)
        .delete(`${url}/${user._id}`)
        .auth(token, { type: 'bearer' })
        .send({ password: '1234', confirmPassword: '123456' });

      expect(res.status).toBe(400);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({
        message: 'Password and password confirmation mismatch',
      });

      res = await request(app)
        .delete(`${url}/${user._id}`)
        .auth(token, { type: 'bearer' })
        .send({ password: '1234567', confirmPassword: '1234567' });

      expect(res.status).toBe(400);
      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toMatchObject({ message: 'Invalid password' });
    });
  });

  describe('Success Response', () => {
    it('should return a success response if password and confirmPassword are valid', async () => {
      const token = await global.signIn(payload);

      const res = await request(app)
        .delete(`${url}/${user._id}`)
        .auth(token, { type: 'bearer' })
        .send({ password: '123456', confirmPassword: '123456' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBeTruthy();
      expect(res.body).toEqual(expect.objectContaining({ message: 'Successfully deleted' }));

      const users = await User.find({});

      expect(users).not.toEqual(
        expect.arrayContaining([expect.objectContaining({ _id: user._id })]),
      );
    });
  });
});
