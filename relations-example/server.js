const { app } = require('./app');

// Models
const { Movie } = require('./models/movie.model');
const { Review } = require('./models/review.model');
const { Actor } = require('./models/actor.model');

// Utils
const { db } = require('./util/database.util');

const startServer = async () => {
	try {
		// Database authenticated
		await db.authenticate();

		// Establish models relations

		// 1 Movie <----> M Review
		Movie.hasMany(Review, { foreignKey: 'movieId' });
		Review.belongsTo(Movie);

		// M Movie <----> M Actor
		Movie.belongsToMany(Actor, {
			through: 'actorInMovie',
			foreignKey: 'movieId',
		});
		Actor.belongsToMany(Movie, {
			through: 'actorInMovie',
			foreignKey: 'actorId',
		});

		// Database synced
		await db.sync();

		// Spin up server
		const PORT = process.env.PORT || 4000;
		app.listen(PORT, () => {
			console.log(`Express app running on port: ${PORT}`);
		});
	} catch (error) {
		console.log(error);
	}
};

startServer();
