const { db, DataTypes } = require('../utils/database.util');

const Artist = db.define('artist', {
	id: {
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		type: DataTypes.INTEGER,
	},
	name: {
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

module.exports = { Artist };
