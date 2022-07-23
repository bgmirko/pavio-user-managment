import { sequelize } from '../database/sequelize';

const Sequelize = require('sequelize');

const Session = sequelize.define('Like', {
    userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        foreignKey: true,
        allowNull: false,
    },
    idLoggedIn: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
},
    {
        underscored: true,
        timestamps: true,
        charset: "utf8",
        collate: "utf8_unicode_ci",
        tableName: "likes"
    }
)

module.exports = Session;