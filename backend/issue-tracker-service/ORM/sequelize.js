const { Sequelize } = require('sequelize');
const MYSQL_LINK = process.env.MYSQL_LINK;
const sequelize = new Sequelize(MYSQL_LINK); 

sequelize.sync()
    .then(() => {
        console.log('All models were synchronized successfully.');
    })
    .catch(err => {
        console.error('Failed to synchronize models:', err);
    });

process.on('SIGINT', () => {
    sequelize.close().then(() => {
        console.log('Database connection closed.');
        process.exit();
    });
});
module.exports = sequelize;