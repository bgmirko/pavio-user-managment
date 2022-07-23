import { sequelize } from '../database/sequelize';

const Sequelize = require('sequelize');

const User = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true
    },
    address: {
        type: Sequelize.STRING,
        allowNull: true
    },
    likes: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    }
},
    {
        underscored: true,
        timestamps: true,
        charset: "utf8",
        collate: "utf8_unicode_ci",
        tableName: "users"
    }
)

User.associate = function (models) {
    models.User.hasMany(models.Like, {
        foreignKey: "likeFrom",
        as: "usersInteracted"
    })
}

export default User;