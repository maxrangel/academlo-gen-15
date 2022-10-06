const express = require('express');

// Controller
const {
	createArtist,
	getAllArtists,
	updateArtist,
	deleteArtist,
	createAlbum,
} = require('../controllers/artists.controller');

// Middleware
const { protectSession } = require('../middlewares/auth.middlewares');
const { artistExists } = require('../middlewares/artists.middlewares');
const {
	createArtistValidators,
} = require('../middlewares/validators.middlewares');

// Utils
const { upload } = require('../utils/multer.util');

const artistsRouter = express.Router();

artistsRouter.get('/', getAllArtists);

artistsRouter.use(protectSession);

artistsRouter.post(
	'/',
	upload.single('artistPhoto'),
	createArtistValidators,
	createArtist
);

artistsRouter.patch('/:id', artistExists, updateArtist);

artistsRouter.delete('/:id', artistExists, deleteArtist);

artistsRouter.post(
	'/albums/:artistId',
	upload.single('albumPhoto'),
	artistExists,
	createAlbum
);

module.exports = { artistsRouter };
