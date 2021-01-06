const ErrorResponse = require('../utils/errorResponse.js');

const errorHandler = (err, req, res, next) => {
	const error = { ...err };

	if (err.name === 'CastError') {
		return res
			.status(404)
			.json(
				new ErrorResponse({ message: `Resource with an of ${error.value} not found` })
			);
	}

	if (err.name === 'ValidationError') {
		const errorFields = Object.keys(error.errors);

		errorFields.forEach((field) => {
			error.errors[field] = error.errors[field].message;
		});

		return res.status(400).json({ success: false, ...error });
	}

	res.status(res.statusCode === 200 ? 500 : res.statusCode);
	res.json({ success: false, ...error });
};

module.exports = errorHandler;
