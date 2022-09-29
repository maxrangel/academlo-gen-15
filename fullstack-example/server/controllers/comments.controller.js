// Models
const { Comment } = require('../models/comment.model');
const { Post } = require('../models/post.model');
const { User } = require('../models/user.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');

const getAllComments = catchAsync(async (req, res, next) => {
	const comments = await Comment.findAll({
		include: [
			{
				model: User,
			},
			{ model: Post, include: { model: User } },
		],
	});

	res.status(200).json({
		status: 'success',
		data: {
			comments,
		},
	});
});

const createComment = catchAsync(async (req, res, next) => {
	const { comment, postId } = req.body;
	const { sessionUser } = req;

	const newComment = await Comment.create({
		comment,
		userId: sessionUser.id,
		postId,
	});

	res.status(201).json({
		status: 'success',
		data: { newComment },
	});
});

const updateComment = catchAsync(async (req, res, next) => {
	const { newComment } = req.body;
	const { comment } = req;

	await comment.update({ comment: newComment });

	res.status(200).json({
		status: 'success',
		data: { comment },
	});
});

const deleteComment = catchAsync(async (req, res, next) => {
	const { comment } = req;

	await comment.update({ status: 'deleted' });

	res.status(200).json({
		status: 'success',
	});
});

module.exports = {
	getAllComments,
	createComment,
	updateComment,
	deleteComment,
};
