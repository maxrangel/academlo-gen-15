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
});

// postgres -> STRING -> varchar
// mysql -> STRING -> text
// mssql -> STRING -> char

// Define first model
db.define('user', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.STRING,
	},
	email: {
		type: DataTypes.STRING,
	},
	password: {
		type: DataTypes.STRING,
	},
	status: {
		type: DataTypes.STRING,
	},
});

db.authenticate()
	.then(() => console.log('Database authenticaded'))
	.catch(err => console.log(err));

// Dummy data
const users = [
	{ id: 1, name: 'Max', age: 23 },
	{ id: 2, name: 'John', age: 24 },
	{ id: 3, name: 'Joe', age: 25 },
];

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
app.get('/users', (req, res) => {
	res.status(200).json({
		status: 'success',
		data: {
			users,
		},
	});
});

app.post('/users', (req, res) => {
	const { name, age } = req.body;

	const newUser = {
		id: Math.floor(Math.random() * 1000),
		name,
		age,
	};

	users.push(newUser);

	// 201 -> Success and a resource has been created
	res.status(201).json({
		status: 'success',
		data: { newUser },
	});
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
