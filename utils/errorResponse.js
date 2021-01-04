class ErrorResponse extends Error {
	constructor(errors) {
		super();

		this.errors = errors;
	}
}

module.exports = ErrorResponse;
