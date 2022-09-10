// Models
const { Comment } = require('../models/comment.model');

const commentExists = async (req, res, next) => {
	try {
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
	} catch (error) {
		console.log(error);
	}
};

module.exports = { commentExists };
