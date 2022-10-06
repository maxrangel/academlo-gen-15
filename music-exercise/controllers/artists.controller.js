// Models
const { Artist } = require('../models/artist.model');
const { Album } = require('../models/album.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { uploadPhoto, getArtistsPhotos } = require('../utils/firebase.util');

const createArtist = catchAsync(async (req, res, next) => {
	const { name, genre } = req.body;

	const newArtist = await Artist.create({ name, genre });

	// Upload img
	const imgUrl = await uploadPhoto(req.file, newArtist.id, 'artists');

	await newArtist.update({ imgUrl });

	res.status(201).json({
		status: 'active',
		data: { newArtist },
	});
});

const getAllArtists = catchAsync(async (req, res, next) => {
	const artists = await Artist.findAll({
		where: { status: 'active' },
		include: { model: Album },
	});

	const artistsWithImgs = await getArtistsPhotos(artists);

	res.status(200).json({
		status: 'success',
		data: { artists: artistsWithImgs },
	});
});

const updateArtist = catchAsync(async (req, res, next) => {
	const { name } = req.body;
	const { artist } = req;

	await artist.update({ name });

	res.status(200).json({
		status: 'success',
		data: { artist },
	});
});

const deleteArtist = catchAsync(async (req, res, next) => {
	const { artist } = req;

	await artist.update({ status: 'deleted' });

	res.status(200).json({
		status: 'success',
	});
});

const createAlbum = catchAsync(async (req, res, next) => {
	const { title, genre } = req.body;
	const { artistId } = req.params;

	const newAlbum = await Album.create({ title, genre, artistId });

	const imgUrl = await uploadPhoto(req.file, newAlbum.id, 'albums');

	await newAlbum.update({ imgUrl });

	res.status(201).json({
		status: 'success',
		data: { newAlbum },
	});
});

module.exports = {
	createArtist,
	getAllArtists,
	updateArtist,
	deleteArtist,
	createAlbum,
};
