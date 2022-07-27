'use strict';
import {
    Model
} from 'sequelize';

interface LikesAttributes {
    id: number;
    likeFrom: number;
    likeTo: number;
    isLiked: boolean;
}
module.exports = (sequelize: any, DataTypes: any) => {
    class Like extends Model<LikesAttributes> implements LikesAttributes {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        id: number;
        likeFrom: number;
        likeTo: number;
        isLiked: boolean;
        static associate(models: any) {
            // define association here
            Like.belongsTo(models.User)
        }
    }
    Like.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        likeFrom: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            }
        },
        likeTo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            }
        },
        isLiked: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'Like',
        underscored: true,
    });
    return Like;
};