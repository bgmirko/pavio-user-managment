'use strict';
import {
    Model
} from 'sequelize';

interface UserAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
    address: string;
    likes: number;
}
module.exports = (sequelize: any, DataTypes: any) => {
    class User extends Model<UserAttributes> implements UserAttributes {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        id: number;
        name: string;
        email: string;
        password: string;
        address: string;
        likes: number;
        static associate(models: any) {
            // definition of association
            User.hasMany(models.Like, {
                foreignKey: 'like_from',
                as: 'likeAction'
            })
            User.hasOne(models.Session, {
                foreignKey: 'user_id'
            })
        }
    }
    User.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        likes: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {
        sequelize,
        modelName: 'User',
        underscored: true,
    });
    return User;
};