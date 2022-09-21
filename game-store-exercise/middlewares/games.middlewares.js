// Models
const { Game } = require('../models/game.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const gameExists = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const game = await Game.findOne({ where: { id, status: 'active' } });

	if (!game) {
		return next(new AppError('Game does not exists', 404));
	}

	req.game = game;
	next();
});

module.exports = { gameExists };
