//express server
const express = require("express");
const app = express();
const db = require("./models");
const initRoutes = require("./routes/web");

global.__basedir = __dirname;

app.use(express.urlencoded({ extended: true }));
initRoutes(app);

//call sequelize sync() method
db.sequelize.sync();
//if you need to drop existing tables and re-sync db then use the below commented out code
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

let port = 3001;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});