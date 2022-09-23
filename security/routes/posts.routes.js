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
const {
	protectSession,
	protectPostsOwners,
} = require('../middlewares/auth.middlewares');
const {
	createPostValidators,
} = require('../middlewares/validators.middlewares');

// Utils
const { upload } = require('../utils/multer.util');

const postsRouter = express.Router();

postsRouter.use(protectSession);

postsRouter.get('/', getAllPosts);

postsRouter.post('/', upload.single('postImg'), createPost);

postsRouter.patch('/:id', postExists, protectPostsOwners, updatePost);

postsRouter.delete('/:id', postExists, protectPostsOwners, deletePost);

module.exports = { postsRouter };
