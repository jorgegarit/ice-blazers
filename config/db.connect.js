const Sequelize = require("sequelize");
const db = require("./db.config");

const sequelize = new Sequelize(db.DB, db.USER, db.PASSWORD, {
  host: db.HOST,
  dialect: db.DIALECT
});

module.exports = sequelize;