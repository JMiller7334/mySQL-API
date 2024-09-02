//database connection:
const { Sequelize } = require('sequelize');
const connection = require('./connection'); // Make sure the path is correct

const sequelize = new Sequelize(connection.databaseName, connection.username, connection.password, {
  host: connection.host,
  dialect: 'mysql',
  port: connection.port,
  /*dialectOptions: {
    socketPath: connection.socketPath,
  },*/
});

// Uncomment the following lines and comment out `dialectOptions` for TCP/IP connection:
// port: connection.port, // Use this line if specifying a port for local or remote database
// host: connection.host, // Use this line to specify the host for TCP/IP connection

module.exports = sequelize;