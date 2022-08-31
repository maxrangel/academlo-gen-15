// Models
const { User } = require('../models/user.model');

const getAllUsers = async (req, res) => {
	try {
		const users = await User.findAll();

		res.status(200).json({
			status: 'success',
			data: {
				users,
			},
		});
	} catch (error) {
		console.log(error);
	}
};

const createUser = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		const newUser = await User.create({ name, email, password });

		// 201 -> Success and a resource has been created
		res.status(201).json({
			status: 'success',
			data: { newUser },
		});
	} catch (error) {
		console.log(error);
	}
};

const updateUser = async (req, res) => {
	try {
		const { name } = req.body;
		const { id } = req.params;

		// Check if the user exists before update
		const user = await User.findOne({ where: { id } });

		// If user doesn't exist, send error message
		if (!user) {
			return res.status(404).json({
				status: 'error',
				message: 'User not found',
			});
		}

		const updatedUser = await User.update({ name }, { where: { id } });

		res.status(200).json({
			status: 'success',
			data: { updatedUser },
		});
	} catch (error) {
		console.log(error);
	}
};

const deleteUser = async (req, res) => {};

module.exports = {
	getAllUsers,
	createUser,
	updateUser,
	deleteUser,
};
