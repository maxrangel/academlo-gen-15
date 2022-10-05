// Models
const { Artist } = require('../models/artist.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { uploadArtistPhoto } = require('../utils/firebase.util');

const createArtist = catchAsync(async (req, res, next) => {
	const { name, genre } = req.body;

	const newArtist = await Artist.create({ name, genre });

	// Upload img
	const imgUrl = await uploadArtistPhoto(req.file, newArtist.id);

	await newArtist.update({ imgUrl });

	res.status(201).json({
		status: 'active',
		data: { newArtist },
	});
});

const getAllArtists = catchAsync(async (req, res, next) => {});

const updateArtist = catchAsync(async (req, res, next) => {});

const deleteArtist = catchAsync(async (req, res, next) => {});

const createAlbum = catchAsync(async (req, res, next) => {});

module.exports = {
	createArtist,
	getAllArtists,
	updateArtist,
	deleteArtist,
	createAlbum,
};
