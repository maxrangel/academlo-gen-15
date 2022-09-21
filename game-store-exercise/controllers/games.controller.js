// Models
const { Game } = require('../models/game.model');
const { Review } = require('../models/review.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');

const createGame = catchAsync(async (req, res, next) => {
	const { title, genre } = req.body;

	const newGame = await Game.create({ title, genre });

	res.status(201).json({
		status: 'success',
		data: { newGame },
	});
});

const getAllGames = catchAsync(async (req, res, next) => {
	const games = await Game.findAll({ where: { status: 'active' } });

	res.status(200).json({
		status: 'success',
		data: { games },
	});
});

const updateGame = catchAsync(async (req, res, next) => {
	const { game } = req;
	const { title } = req.body;

	await game.update({ title });

	res.status(200).json({
		status: 'success',
		data: { game },
	});
});

const deleteGame = catchAsync(async (req, res, next) => {
	const { game } = req;

	await game.update({ status: 'deleted' });

	res.status(200).json({
		status: 'success',
	});
});

const createReview = catchAsync(async (req, res, next) => {
	const { gameId } = req.params;
	const { comment } = req.body;
	const { sessionUser } = req;

	const newReview = await Review.create({
		userId: sessionUser.id,
		gameId,
		comment,
	});

	res.status(201).json({
		status: 'success',
		data: { newReview },
	});
});

module.exports = {
	createGame,
	getAllGames,
	updateGame,
	deleteGame,
	createReview,
};
