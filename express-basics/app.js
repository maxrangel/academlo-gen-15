const express = require('express');

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
	console.log(req.body);
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

// Set server to listen
app.listen(4000, () => {
	console.log('Express app running!');
});
