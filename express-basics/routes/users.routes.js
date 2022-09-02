const express = require('express');

// Controllers
const {
	getAllUsers,
	createUser,
	updateUser,
	deleteUser,
} = require('../controllers/users.controller');

// Middlewares
const { userExists } = require('../middlewares/users.middlewares');

const usersRouter = express.Router();

usersRouter.get('/', getAllUsers);

usersRouter.post('/', createUser);

usersRouter.patch('/:id', userExists, updateUser);

usersRouter.delete('/:id', userExists, deleteUser);

module.exports = { usersRouter };
