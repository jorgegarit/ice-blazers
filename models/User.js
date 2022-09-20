const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

//create User model
class User extends Model {}

//define table columns and config
User.init
(
    {
        //column definitions go here
    },
    {
        //table config goes here
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;