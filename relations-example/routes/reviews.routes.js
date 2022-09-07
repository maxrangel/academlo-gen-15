const express = require('express');

// Controllers
const {
	getAllReviews,
	getReviewById,
	createReview,
} = require('../controllers/reviews.controller');

const reviewsRouter = express.Router();

reviewsRouter.get('/', getAllReviews);

reviewsRouter.post('/', createReview);

reviewsRouter.get('/:id', getReviewById);

module.exports = { reviewsRouter };
