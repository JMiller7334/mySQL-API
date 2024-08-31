// models/UsageData.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/index');
const Customer = require('./Customer');

const UsageData = sequelize.define('UsageData', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  customerId: {
    type: DataTypes.INTEGER,
    references: {
      model: Customer,
      key: 'id',
    },
    allowNull: false,
  },
  usage_month: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customer_usage: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
}, {
  tableName: 'usage_data',
  timestamps: false,
});

module.exports = UsageData;
