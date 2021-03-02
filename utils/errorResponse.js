class ErrorResponse extends Error {
  constructor(errors, statusCode) {
    super();

    this.success = false;
    this.errors = errors;
    this.statusCode = statusCode;
  }
}

module.exports = ErrorResponse;
