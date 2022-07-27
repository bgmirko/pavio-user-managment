'use strict';
import {
    Model
} from 'sequelize';

interface SessionAttributes {
    id: number;
    userId: number;
    isLoggedIn: boolean;
}
module.exports = (sequelize: any, DataTypes: any) => {
    class Session extends Model<SessionAttributes> implements SessionAttributes {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        id: number;
        userId: number;
        isLoggedIn: boolean;
        static associate(models: any) {
            // definition of association
            Session.belongsTo(models.User)
        }
    }
    Session.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            }
        },
        isLoggedIn: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Session',
        underscored: true,
    });
    return Session;
};