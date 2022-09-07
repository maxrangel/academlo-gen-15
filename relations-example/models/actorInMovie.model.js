const { db, DataTypes } = require('../util/database.util');

const ActorInMovie = db.define('actorInMovie', {
	id: {
		primaryKey: true,
		autoIncrement: true,
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	actorId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	movieId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
});

module.exports = { ActorInMovie };
