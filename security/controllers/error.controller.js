const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const sendErrorDev = (error, req, res) => {
	res.status(error.statusCode).json({
		status: error.status,
		message: error.message,
		error,
		stack: error.stack,
	});
};

const sendErrorProd = (error, req, res) => {
	res.status(error.statusCode).json({
		status: error.status,
		message: error.message,
	});
};

const globalErrorHandler = (error, req, res, next) => {
	// Set default values for original error obj
	error.statusCode = error.statusCode || 500;
	error.status = error.status || 'fail';

	if (process.env.NODE_ENV === 'development') {
		sendErrorDev(error, req, res);
	} else if (process.env.NODE_ENV === 'production') {
		sendErrorProd(error, req, res);
	}
};

module.exports = { globalErrorHandler };
