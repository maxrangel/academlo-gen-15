// Models
const { Movie } = require('./movie.model');
const { Review } = require('./review.model');
const { Actor } = require('./actor.model');
const { User } = require('./user.model');

const initModels = () => {
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

	// 1 User <----> M Review
	User.hasMany(Review, { foreignKey: 'userId' });
	Review.belongsTo(User);
};

module.exports = { initModels };
