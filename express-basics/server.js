const dotenv = require('dotenv');

const { app } = require('./app');

// Utils
const { initModels } = require('./models/initModels');
const { db } = require('./utils/database.util');

dotenv.config({ path: './config.env' });

const startServer = async () => {
	try {
		await db.authenticate();

		// Establish the relations between models
		initModels();

		await db.sync();

		// Set server to listen
		const PORT = 4000;

		app.listen(PORT, () => {
			console.log('Express app running!');
		});
	} catch (error) {
		console.log(error);
	}
};

startServer();
