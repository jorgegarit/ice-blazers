const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

//create User model
class User extends Model {}

//define table columns and config
User.init
(
    {
        //define user information
        id:
        {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username:
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        email:
        {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {isEmail:true}
        },
        password:
        {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {len:[4]}
        }
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