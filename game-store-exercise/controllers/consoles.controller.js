// Models
const { Console } = require('../models/console.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const createConsole = catchAsync(async (req, res, next) => {
	const { name, company } = req.body;

	const newConsole = await Console.create({ name, company });

	res.status(201).json({
		status: 'success',
		data: { newConsole },
	});
});

const getAllConsoles = catchAsync(async (req, res, next) => {
	const consoles = await Console.findAll({ where: { status: 'active' } });

	res.status(200).json({
		status: 'success',
		data: { consoles },
	});
});

const updateConsole = catchAsync(async (req, res, next) => {
	const { console } = req;
	const { name } = req.body;

	await console.update({ name });

	res.status(200).json({
		status: 'success',
		data: { console },
	});
});

const deleteConsole = catchAsync(async (req, res, next) => {
	const { console } = req;

	await console.update({ status: 'deleted' });

	res.status(200).json({
		status: 'success',
	});
});

module.exports = {
	createConsole,
	getAllConsoles,
	updateConsole,
	deleteConsole,
};
