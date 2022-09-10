// Models
const { Post } = require('../models/post.model');

const postExists = async (req, res, next) => {
	try {
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
	} catch (error) {
		console.log(error);
	}
};

module.exports = { postExists };
