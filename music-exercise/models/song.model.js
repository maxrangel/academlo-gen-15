const { db, DataTypes } = require('../utils/database.util');

const Song = db.define('song', {
	id: {
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		type: DataTypes.INTEGER,
	},
	albumId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'active',
	},
});

module.exports = { Song };
