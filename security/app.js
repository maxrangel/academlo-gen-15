const express = require('express');

// Routers
const { usersRouter } = require('./routes/users.routes');
const { postsRouter } = require('./routes/posts.routes');
const { commentsRouter } = require('./routes/comments.routes');

// Init our Express app
const app = express();

// Enable Express app to receive JSON data
app.use(express.json());

// Define endpoints
// /posts
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/posts', postsRouter); // next(error)
app.use('/api/v1/comments', commentsRouter);

// Global error handler
app.use((error, req, res, next) => {
	res.status(400).json({
		status: 'error',
		message: error.message,
		error,
	});
});

// Catch non-existing endpoints
app.all('*', (req, res) => {
	res.status(404).json({
		status: 'error',
		message: `${req.method} ${req.url} does not exists in our server`,
	});
});

module.exports = { app };
