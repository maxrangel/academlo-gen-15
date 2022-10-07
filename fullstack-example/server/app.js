const express = require('express');
const cors = require('cors');
const path = require('path');

// Routers
const { usersRouter } = require('./routes/users.routes');
const { postsRouter } = require('./routes/posts.routes');
const { commentsRouter } = require('./routes/comments.routes');

// Controllers
const { globalErrorHandler } = require('./controllers/error.controller');

// Init our Express app
const app = express();

// Enable Express app to receive JSON data
app.use(express.json());

// Enable static files on public folder (render files on html)
app.use(express.static(path.join(__dirname, 'public')));

// Enable cors
app.use(cors());

// Define endpoints
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/posts', postsRouter);
app.use('/api/v1/comments', commentsRouter);
app.use('/', (req, res, next) => {
	const indexPath = path.join(__dirname, 'public', 'index.html');

	res.status(200).sendFile(indexPath);
});

// Global error handler
app.use(globalErrorHandler);

// Catch non-existing endpoints
app.all('*', (req, res) => {
	res.status(404).json({
		status: 'error',
		message: `${req.method} ${req.url} does not exists in our server`,
	});
});

module.exports = { app };
