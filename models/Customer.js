// models/Customer.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/index');

const Customer = sequelize.define('Customer', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    defaultValue: 'notEntered',
  },
  customer_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'customers',
  timestamps: false,
});

module.exports = Customer;
