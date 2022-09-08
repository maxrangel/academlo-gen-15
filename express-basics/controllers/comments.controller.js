// Models
const { Comment } = require('../models/comment.model');

const getAllComments = async (req, res) => {
	try {
		const comments = await Comment.findAll();

		res.status(200).json({
			status: 'success',
			data: {
				comments,
			},
		});
	} catch (error) {
		console.log(error);
	}
};

const createComment = async (req, res) => {
	try {
		const { comment, userId, postId } = req.body;

		const newComment = await Comment.create({ comment, userId, postId });

		res.status(201).json({
			status: 'success',
			data: { newComment },
		});
	} catch (error) {
		console.log(error);
	}
};

const updateComment = async (req, res) => {
	try {
		const { newComment } = req.body;
		const { comment } = req;

		await comment.update({ comment: newComment });

		res.status(200).json({
			status: 'success',
			data: { comment },
		});
	} catch (error) {
		console.log(error);
	}
};

const deleteComment = async (req, res) => {
	try {
		const { comment } = req;

		await comment.update({ status: 'deleted' });

		res.status(200).json({
			status: 'success',
		});
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	getAllComments,
	createComment,
	updateComment,
	deleteComment,
};
