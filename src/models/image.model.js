//of sequelize model image
module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define("image", {
      type: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      data: {
        type: DataTypes.BLOB("long"), //Binary large object that can hold a variable amount of data
      },
    });
  
    return Image;
  };