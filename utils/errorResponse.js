class ErrorResponse extends Error {
  constructor(errors) {
    super();

    this.success = false;
    this.errors = errors;
  }
}

module.exports = ErrorResponse;
