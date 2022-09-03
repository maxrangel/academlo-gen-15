const express = require('express');

// Controllers
const {
	getAllPosts,
	createPost,
	updatePost,
	deletePost,
} = require('../controllers/posts.controller');

// Middlewares
const { postExists } = require('../middlewares/posts.middlewares');

const postsRouter = express.Router();

postsRouter.get('/', getAllPosts);

postsRouter.post('/', createPost);

postsRouter.patch('/:id', postExists, updatePost);

postsRouter.delete('/:id', postExists, deletePost);

module.exports = { postsRouter };
