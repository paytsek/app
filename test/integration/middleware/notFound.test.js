const request = require('supertest');
const app = require('../../../app');

describe('notFound middleware', () => {
  let res;
  const url = '/api/v1/not-found-route';

  beforeEach(async () => {
    res = request(app).get(url);
  });

  it('should return 404 status code', async () => {
    const { status } = await res;

    expect(status).toBe(404);
  });

  it('should have a json response', async () => {
    const { body } = await res;

    expect(body.errors).toEqual(expect.objectContaining({ message: `Not found - ${url}` }));
  });
});
