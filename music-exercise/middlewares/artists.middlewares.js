// Models
const { Artist } = require('../models/artist.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const artistExists = catchAsync(async (req, res, next) => {
	const { id, artistId } = req.params;

	const artist = await Artist.findOne({
		where: { id: id || artistId, status: 'active' },
	});

	if (!artist) {
		return next(new AppError('Artist does not exist', 404));
	}

	req.artist = artist;
	next();
});

module.exports = { artistExists };
