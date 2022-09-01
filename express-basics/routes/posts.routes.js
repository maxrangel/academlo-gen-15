const express = require('express');

// Controllers
const {
	getAllPosts,
	createPost,
	updatePost,
	deletePost,
} = require('../controllers/posts.controller');

const postsRouter = express.Router();

postsRouter.get('/', getAllPosts);

postsRouter.post('/', createPost);

postsRouter.patch('/:id', updatePost);

postsRouter.delete('/:id', deletePost);

module.exports = { postsRouter };
