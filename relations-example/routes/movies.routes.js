const express = require('express');

// Controllers
const {
	getAllMovies,
	getMovieById,
	createMovie,
} = require('../controllers/movies.controller');

const moviesRouter = express.Router();

moviesRouter.get('/', getAllMovies);

moviesRouter.post('/', createMovie);

moviesRouter.get('/:id', getMovieById);

module.exports = { moviesRouter };
