const sequelize = require("./db.connect");

const syncTables = async () => {
  await sequelize.sync();
  console.log("The tables for the Models were just created!");
};

module.exports = syncTables;