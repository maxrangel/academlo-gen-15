const { db, DataTypes } = require('../utils/database.util');

const Album = db.define('album', {
	id: {
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		type: DataTypes.INTEGER,
	},
	artistId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	genre: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	imgUrl: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'active',
	},
});

module.exports = { Album };
