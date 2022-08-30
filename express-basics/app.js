const express = require('express');

// Models
const { Post } = require('./models/post.model');

// Routers
const { usersRouter } = require('./routes/users.routes');

// Utils
const { db } = require('./utils/database.util');

// Define Post model

db.authenticate()
	.then(() => console.log('Database authenticaded'))
	.catch(err => console.log(err));

db.sync()
	.then(() => console.log('Database synced'))
	.catch(err => console.log(err));

// Init our Express app
const app = express();

// Enable Express app to receive JSON data
app.use(express.json());

// Define endpoints
app.use('/users', usersRouter);

// Posts endpoints
// Task: Create posts router
// Task: Create post controller and move functions
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
