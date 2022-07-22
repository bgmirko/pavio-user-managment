import { sequelize } from '../database/sequelize';

const Sequelize = require('sequelize');

const Like = sequelize.define('Like', {
    likeFrom: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        allowNull: false,
    },
    likeTo: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        allowNull: false,
    },
    isLiked: {
        type: Sequelize.BOOLEAN,
        allowNull: false
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

// Like.associate = function (models) {
//     models.Like.belongsTo(models.User, {
//         foreignKey: "likeFrom",
//         as: "userFrom"
//     })
//     models.Like.belongsTo(models.User, {
//         foreignKey: "likeTo",
//         as: "userTo"
//     })
// }

module.exports = Like;
