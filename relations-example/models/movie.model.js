const { db, DataTypes } = require('../util/database.util');

const Movie = db.define('movie', {
	id: {
		primaryKey: true,
		autoIncrement: true,
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	description: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	duration: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 0,
	},
	rating: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 1,
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'active',
	},
});

module.exports = { Movie };
