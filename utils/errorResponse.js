class ErrorResponse extends Error {
	constructor(errors) {
		super();

		this.errors = errors;
		this.success = false;
	}
}

module.exports = ErrorResponse;
