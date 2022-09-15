// Models
const { Comment } = require('../models/comment.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');

const commentExists = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const comment = await Comment.findOne({ where: { id } });

	if (!comment) {
		return res.status(404).json({
			status: 'error',
			message: 'Comment not found',
		});
	}

	req.comment = comment;
	next();
});

module.exports = { commentExists };
