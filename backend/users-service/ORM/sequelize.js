const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mysql://root:password@localhost:3306/trackademic'); 

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