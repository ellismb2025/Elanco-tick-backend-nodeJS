const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './storage/data.db',
  logging: false // Disable logging; set to console.log to see SQL queries
});

module.exports = sequelize;