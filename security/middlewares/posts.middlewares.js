// Models
const { Post } = require('../models/post.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');

const postExists = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const post = await Post.findOne({ where: { id } });

	if (!post) {
		return res.status(404).json({
			status: 'error',
			message: 'Post not found',
		});
	}

	req.post = post;
	next();
});

module.exports = { postExists };
