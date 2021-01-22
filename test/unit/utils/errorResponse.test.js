const ErrorResponse = require('../../../utils/errorResponse');

describe('utils/ErrorResponse class', () => {
  it('should return an error object', async () => {
    const errorResponse = new ErrorResponse({ message: 'test error' });

    expect(errorResponse.errors).toHaveProperty('message', 'test error');
  });
});
