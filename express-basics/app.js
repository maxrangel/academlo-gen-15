const express = require('express');
const { DataTypes } = require('sequelize');

// Models
const { User } = require('./models/user.model');

// Utils
const { db } = require('./utils/database.util');

// Define Post model
const Post = db.define('post', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	content: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'active',
	},
});

db.authenticate()
	.then(() => console.log('Database authenticaded'))
	.catch(err => console.log(err));

db.sync()
	.then(() => console.log('Database synced'))
	.catch(err => console.log(err));

// Init our Express app
const app = express();

// Enable Express app to receive JSON data
app.use(express.json()); // Middleware

// Define endpoints

// Users endpoints
app.get('/users', async (req, res) => {
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
});

app.post('/users', async (req, res) => {
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
});

// Posts endpoints
app.get('/posts', async (req, res) => {
	try {
		const posts = await Post.findAll();

		res.status(200).json({
			status: 'success',
			data: {
				posts,
			},
		});
	} catch (error) {
		console.log(error);
	}
});

app.post('/posts', async (req, res) => {
	try {
		const { title, content, userId } = req.body;

		const newPost = await Post.create({ title, content, userId });

		res.status(201).json({
			status: 'success',
			data: { newPost },
		});
	} catch (error) {
		console.log(error);
	}
});

// Catch non-existing endpoints
app.all('*', (req, res) => {
	res.status(404).json({
		status: 'error',
		message: `${req.method} ${req.url} does not exists in our server`,
	});
});

// Set server to listen
const PORT = 4000;

app.listen(PORT, () => {
	console.log('Express app running!');
});
