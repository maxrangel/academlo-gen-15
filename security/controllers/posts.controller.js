// Models
const { Post } = require('../models/post.model');
const { User } = require('../models/user.model');
const { Comment } = require('../models/comment.model');

const getAllPosts = async (req, res, next) => {
	try {
		const posts = await Post.findAll({
			where: { status: 'active' },
			attributes: ['id', 'title', 'content', 'createdAt'],
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
			data: {
				posts,
			},
		});
	} catch (error) {
		next(error);
	}
};

const createPost = async (req, res) => {
	try {
		const { title, content } = req.body;
		const { sessionUser } = req;

		const newPost = await Post.create({
			title,
			content,
			userId: sessionUser.id,
		});

		res.status(201).json({
			status: 'success',
			data: { newPost },
		});
	} catch (error) {
		console.log(error);
	}
};

const updatePost = async (req, res) => {
	try {
		const { title, content } = req.body;
		const { post } = req;

		await post.update({ title, content });

		res.status(200).json({
			status: 'success',
			data: { post },
		});
	} catch (error) {
		console.log(error);
	}
};

const deletePost = async (req, res) => {
	try {
		const { post } = req;

		await post.update({ status: 'deleted' });

		res.status(200).json({
			status: 'success',
		});
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	getAllPosts,
	createPost,
	updatePost,
	deletePost,
};
