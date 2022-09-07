// Models
const { Review } = require('../models/review.model');

const getAllReviews = async (req, res, next) => {
	const reviews = await Review.findAll();

	res.status(200).json({
		status: 'success',
		data: { reviews },
	});
};

const getReviewById = async (req, res, next) => {
	const { id } = req.params;

	const review = await Review.findOne({ where: { id } });

	res.status(200).json({
		status: 'success',
		data: { review },
	});
};

const createReview = async (req, res, next) => {
	const { comment, userId, movieId } = req.body;

	const newReview = await Review.create({
		comment,
		userId,
		movieId,
	});

	res.status(201).json({
		status: 'success',
		data: { newReview },
	});
};

module.exports = {
	getAllReviews,
	getReviewById,
	createReview,
};
