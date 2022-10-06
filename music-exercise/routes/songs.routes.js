const express = require('express');

// Controllers
const { createSong, favoriteSong } = require('../controllers/songs.controller');

// Middlewares
const { protectSession } = require('../middlewares/auth.middlewares');

const songsRouter = express.Router();

songsRouter.use(protectSession);

songsRouter.post('/:albumId', createSong);

songsRouter.post('/favorite/:songId', favoriteSong);

module.exports = { songsRouter };
