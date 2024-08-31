//database connection:
const { Sequelize } = require('sequelize');
const connection = require('./connection'); // Make sure the path is correct

const sequelize = new Sequelize(connection.databaseName, connection.username, connection.password, {
  host: connection.host, // Include host if it's defined
  dialect: 'mysql',
  port: connection.port,
});

module.exports = sequelize;


