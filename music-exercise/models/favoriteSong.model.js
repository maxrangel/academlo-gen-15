const { db, DataTypes } = require('../utils/database.util');

const FavoriteSong = db.define('favoriteSong', {
	id: {
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		type: DataTypes.INTEGER,
	},
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	songId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	favorite: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: true,
	},
});

module.exports = { FavoriteSong };
