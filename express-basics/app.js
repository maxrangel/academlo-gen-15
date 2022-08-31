const express = require('express');

// Routers
const { usersRouter } = require('./routes/users.routes');
const { postsRouter } = require('./routes/posts.routes');

// Utils
const { db } = require('./utils/database.util');

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
app.use('/posts', postsRouter);

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
