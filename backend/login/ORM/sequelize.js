const { Sequelize } = require('sequelize');

// Option 1: Passing a connection URI
// Replace 'username', 'password', 'database', and 'host' with your details
const sequelize = new Sequelize('mysql://root:password@localhost:3306/trackademic'); 

// Option 2: Passing parameters separately (without URI)
/*
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'host',
  dialect: 'mysql'
});
*/

module.exports = sequelize;