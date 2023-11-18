const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); // The path to the sequelize.js file

const Users = sequelize.define('Users', {
  userID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true,
  freezeTableName: true
});

module.exports = Users;