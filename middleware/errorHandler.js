const errorHandler = (err, req, res, next) => {
	const errors = { ...err };
	res.status(res.statusCode);
	res.json({ ...errors });
};

module.exports = errorHandler;
