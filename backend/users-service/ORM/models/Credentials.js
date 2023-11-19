const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); // The path to the sequelize.js file

const Credentials = sequelize.define('Credentials', {
  userID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true,
  freezeTableName: true
});

module.exports = Credentials;