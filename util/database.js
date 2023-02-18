const Sequelize = require('sequelize')

const sequelize = new Sequelize('deleting-cart','root','PFH#23kgrw9',
{
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize;