//exports configuring parameters for mysql connection and sequelize
module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "password",
    DB: "UPLOAD",
    dialect: "mysql",
    pool: { // used for sequelize connection pool configuration
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };