const { db, DataTypes } = require('../utils/database.util');

const Comment = db.define('comment', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	comment: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	postId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'active',
	},
});

module.exports = { Comment };
