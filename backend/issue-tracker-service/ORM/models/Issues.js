const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); // The path to the sequelize.js file

const Issues = sequelize.define('Issues', {
  issueID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,     
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status:{
    type: DataTypes.STRING,
    allowNull: false,     
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false, 
  },
  assignee: {
    type: DataTypes.INTEGER,
    allowNull: false, 
  },
  attachmentID: {
    type: DataTypes.STRING,
    allowNull: true, 
  },  
}, {
  timestamps: true,
  freezeTableName: true
});

module.exports = Issues;