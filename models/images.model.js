const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.connect");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const Image = sequelize.define("image", {
  id_User: {
    type: DataTypes.INTEGER,
  },
  image_path: {
    type: DataTypes.STRING,
  }
});

module.exports = Image;