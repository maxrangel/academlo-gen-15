// Models
const { Post } = require('../models/post.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const postExists = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const post = await Post.findOne({ where: { id } });

	if (!post) {
		return next(new AppError('Post does not exists', 404));
	}

	req.post = post;
	next();
});

module.exports = { postExists };
