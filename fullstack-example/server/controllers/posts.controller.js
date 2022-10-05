// Models
const { Post } = require('../models/post.model');
const { User } = require('../models/user.model');
const { Comment } = require('../models/comment.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');

const getAllPosts = catchAsync(async (req, res, next) => {
	const posts = await Post.findAll({
		where: { status: 'active' },
		attributes: ['id', 'title', 'userId', 'content', 'createdAt'],
		order: [
			// ['column', 'DESC | ASC']
			['createdAt', 'DESC'],
		],
		include: [
			{ model: User, attributes: ['id', 'name'] },
			{
				model: Comment,
				required: false, // Apply OUTER JOIN
				where: { status: 'active' },
				attributes: ['id', 'comment', 'status', 'createdAt'],
			},
		],
	});

	res.status(200).json({
		status: 'success',
		data: { posts },
	});
});

const createPost = catchAsync(async (req, res, next) => {
	const { title, content } = req.body;
	const { sessionUser } = req;

	const newPost = await Post.create({
		title,
		content,
		userId: sessionUser.id,
	});

	res.status(201).json({
		status: 'success',
		data: { newPost, name: sessionUser.name },
	});
});

const updatePost = catchAsync(async (req, res, next) => {
	const { title, content } = req.body;
	const { post } = req;

	await post.update({ title, content });

	res.status(200).json({
		status: 'success',
		data: { post },
	});
});

const deletePost = catchAsync(async (req, res, next) => {
	const { post } = req;

	await post.update({ status: 'deleted' });

	res.status(200).json({
		status: 'success',
	});
});

const getMyPosts = catchAsync(async (req, res, next) => {
	const { sessionUser } = req;

	const posts = await Post.findAll({
		where: { status: 'active', userId: sessionUser.id },
		include: [
			{ model: User, attributes: { exclude: ['password'] } },
			{ model: Comment },
		],
	});

	res.status(200).json({
		status: 'success',
		data: { posts },
	});
});

const getUsersPosts = catchAsync(async (req, res, next) => {
	const { userId } = req.params;

	const posts = await Post.findAll({
		where: { userId, status: 'active' },
		include: [
			{ model: User, attributes: { exclude: ['password'] } },
			{ model: Comment },
		],
	});

	res.status(200).json({
		status: 'success',
		data: { posts },
	});
});

module.exports = {
	getAllPosts,
	createPost,
	updatePost,
	deletePost,
	getMyPosts,
	getUsersPosts,
};
