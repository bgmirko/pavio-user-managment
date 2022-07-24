import { sequelize } from '../database/sequelize';

const Sequelize = require('sequelize');

const Session = sequelize.define('Session', {
    userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        foreignKey: true,
        allowNull: false,
    },
    isLoggedIn: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    }
},
    {
        underscored: true,
        timestamps: true,
        charset: "utf8",
        collate: "utf8_unicode_ci",
        tableName: "session"
    }
)

export default Session;