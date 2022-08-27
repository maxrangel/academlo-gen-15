const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

// Establish db connection
const db = new Sequelize({
	dialect: 'postgres',
	host: 'localhost',
	username: 'postgres',
	password: 'pass1234',
	port: 5432,
	database: 'blogs',
	logging: false,
});

// Define first model
const User = db.define('user', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'active',
	},
});

// Task: Create Post model
// 	id: INTEGER, title!: STRING, content!: STRING, userId!: INTEGER, status: STRING 'active'

// Task: Implement the Post model to fetch all the posts in the GET /posts endpoint
// Task: Implement the Post model to create a new post in the db in the POST /posts endpoint

db.authenticate()
	.then(() => console.log('Database authenticaded'))
	.catch(err => console.log(err));

db.sync()
	.then(() => console.log('Database synced'))
	.catch(err => console.log(err));

const posts = [
	{ id: 1, title: 'Post 1', content: 'This is post 1' },
	{ id: 2, title: 'Post 2', content: 'This is post 2' },
	{ id: 3, title: 'Post 3', content: 'This is post 3' },
];

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
app.get('/posts', (req, res) => {
	res.status(200).json({
		status: 'success',
		data: {
			posts,
		},
	});
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
