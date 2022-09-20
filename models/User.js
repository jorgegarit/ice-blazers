const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// calling bcrypt to encrypt password
const bcrypt = require('bcrypt');


// creating the user model 
class User extends Model { 
    // will fill with information later during hatching
}

// this section will help define the table columns 
User.init(
    {
    //id column
    id: {
        type: DataTypes.INTEGER, //id will be a number 
        allowNull: false, //table will not have null values
        primaryKey: true, //will uniquely identify each id in the table
        autoIncrement: true //will generate sequential number
    },
    //name column
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    //email column
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { //this validtaes that the email is in correct formate ie. test@test.com
          isEmail: true
        }
    },
    //password column
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [8, 20],
            msg: "The password needs to be between 8 and 20 characters in length"
          }
        }
    }
    // confirmPassword column i think i will have to add this in after i get the hatch data
    // confirm: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   set(val) {
    //     if (val === this.password) {
    //       const hashPass = newUserData.password;
    //       this.setDataValue('confirm', hashPass);
    //     }
    //   },
    //   validate: {
    //     notNull: {
    //       msg: 'Passwords need to match'
    //     }
    //   }
    // }
    },
    {
      // Adding hooks to create hashed password
      hooks: {
        // using befor create hook to the hash password gets created before the new user is added
        async beforeCreate(newUserData) {
          newUserData.password = await bcrypt.hash(newUserData.password, 10);
          return newUserData;
        }
      },
      //Table Configurations
      //this passes our connection to the database
      sequelize,
      //wont create timestamps
      timestamps: false,
      //wont make names plural
      freezeTableName: true,
      //ie hello_world, wont use camel notation
      underscored: true,
      //will keep the name lowercase in dtatabase
      modelName: 'user'
    }
  );
  
  //exporting User.init
  module.exports = User;