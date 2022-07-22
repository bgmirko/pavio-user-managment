const Sequelize = require('sequelize');

// TODO move to env file
export const sequelize = new Sequelize('postgres', 'postgres', 'password', {
    dialect: 'postgres',
    host: "db",
    port: "5432"
})
