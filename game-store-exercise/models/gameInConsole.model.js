const { db, DataTypes } = require('../utils/database.util');

const GameInConsole = db.define('gameInConsole', {
	id: {
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		type: DataTypes.INTEGER,
	},
	consoleId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	gameId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'active',
	},
});

module.exports = { GameInConsole };
