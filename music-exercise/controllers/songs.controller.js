// Models
const { Song } = require('../models/song.model');
const { Album } = require('../models/album.model');
const { FavoriteSong } = require('../models/favoriteSong.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const createSong = catchAsync(async (req, res, next) => {
	const { albumId } = req.params;
	const { title } = req.body;

	const album = await Album.findOne({
		where: { id: albumId, status: 'active' },
	});

	if (!album) {
		return next(new AppError('Album not found', 404));
	}

	const newSong = await Song.create({ title, albumId });

	res.status(200).json({
		status: 'success',
		data: { newSong },
	});
});

const favoriteSong = catchAsync(async (req, res, next) => {
	const { songId } = req.params;
	const { sessionUser } = req;

	const song = await Song.findOne({
		where: { id: songId, status: 'active' },
	});

	if (!song) {
		return next(new AppError('Song does not exists', 404));
	}

	// Check if it is the first time the user marks the song as favorite
	const favoriteExists = await FavoriteSong.findOne({
		where: { songId, userId: sessionUser.id },
	});

	if (!favoriteExists) {
		// Add song to favorites to that user
		await FavoriteSong.create({ songId, userId: sessionUser.id });
	} else {
		// Song is already in favorites, add or remove it according to its current status
		const newStatus = !favoriteExists.favorite;

		await favoriteExists.update({ favorite: newStatus });
	}

	res.status(200).json({
		status: 'success',
	});
});

module.exports = { createSong, favoriteSong };
