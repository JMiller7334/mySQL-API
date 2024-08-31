// test-connection.js
const sequelize = require('./config/index');
console.log('running connection test: ... ');

sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
