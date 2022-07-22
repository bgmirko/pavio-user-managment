import { sequelize } from '../database/sequelize';

const Sequelize = require('sequelize');

export const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }
})