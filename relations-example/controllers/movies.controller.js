// Models
const { Movie } = require('../models/movie.model');

const getAllMovies = async (req, res, next) => {
	const movies = await Movie.findAll();

	res.status(200).json({
		status: 'success',
		data: { movies },
	});
};

const getMovieById = async (req, res, next) => {
	const { id } = req.params;

	const movie = await Movie.findOne({ where: { id } });

	res.status(200).json({
		status: 'success',
		data: { movie },
	});
};

const createMovie = async (req, res, next) => {
	const { title, description, duration, rating } = req.body;

	const newMovie = await Movie.create({
		title,
		description,
		duration,
		rating,
	});

	res.status(201).json({
		status: 'success',
		data: { newMovie },
	});
};

module.exports = {
	getAllMovies,
	getMovieById,
	createMovie,
};
