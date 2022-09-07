const { Sequelize, DataTypes } = require('sequelize');

const db = new Sequelize({
	host: 'localhost',
	username: 'postgres',
	password: 'pass1234',
	database: 'relations-example',
	port: 5432,
	dialect: 'postgres',
	logging: false,
});

module.exports = { db, DataTypes };
