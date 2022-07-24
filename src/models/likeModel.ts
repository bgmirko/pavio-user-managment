import { sequelize } from '../database/sequelize';

const Sequelize = require('sequelize');

const Like = sequelize.define('Like', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    likeFrom: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
            model: 'user',
            key: 'id',
        },
        allowNull: false,
    },
    likeTo: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    isLiked: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    },
},
    {
        underscored: true,
        timestamps: true,
        charset: "utf8",
        collate: "utf8_unicode_ci",
        tableName: "like"
    }
)

Like.associate = function (models) {
    models.Like.belongsTo(models.User, {
        foreignKey: "like_from",
        targetKey: "id",
        as: "likes"
    })
    // models.Like.belongsTo(models.User, {
    //     foreignKey: "likeTo",
    //     as: "userTo"
    // })
}

export default Like;