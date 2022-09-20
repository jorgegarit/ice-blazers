// import sequalize constructor
const Sequelize = require('sequelize');

require('dotenv').config();

// create the connection to the database and load environment variables
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
});

// exporting connecion
module.exports = sequelize;