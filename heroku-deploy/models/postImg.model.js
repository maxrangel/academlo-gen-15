const { db, DataTypes } = require('../utils/database.util');

const PostImg = db.define('postImg', {
	id: {
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		type: DataTypes.INTEGER,
	},
	postId: {
		allowNull: false,
		type: DataTypes.INTEGER,
	},
	imgUrl: {
		allowNull: false,
		type: DataTypes.STRING,
	},
	status: {
		allowNull: false,
		type: DataTypes.STRING,
		defaultValue: 'active',
	},
});

module.exports = { PostImg };
