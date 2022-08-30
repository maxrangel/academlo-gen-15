const { Sequelize, DataTypes } = require('sequelize');

// Establish db connection
const db = new Sequelize({
	dialect: 'postgres',
	host: 'localhost',
	username: 'postgres',
	password: 'pass1234',
	port: 5432,
	database: 'blogs',
	logging: false,
});

module.exports = { db, DataTypes };
