const Sequelize = require('sequelize');

export const sequelize = new Sequelize(process.env.DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT)
})

