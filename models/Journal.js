const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Journal extends Model {}

Journal.init
(
    {
        id:
        {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title:
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        journal_title:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        journal_desc:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id:
        {
            type: DataTypes.INTEGER,
            references:
            {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'journal'
    }
);

module.exports = Journal;