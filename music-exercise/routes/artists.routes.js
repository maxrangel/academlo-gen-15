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

// Utils
const { upload } = require('../utils/multer.util');

const artistsRouter = express.Router();

artistsRouter.get('/', getAllArtists);

artistsRouter.use(protectSession);

artistsRouter.post('/', upload.single('artistPhoto'), createArtist);

artistsRouter.patch('/:id', updateArtist);

artistsRouter.delete('/:id', deleteArtist);

artistsRouter.post('/albums/:artistId', createAlbum);

module.exports = { artistsRouter };
