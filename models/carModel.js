import sequelize from "../config/sequelizeConfig.js";
import { Model, DataTypes } from 'sequelize'

export class carModel extends Model { }

carModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    model: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    color: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0.00,
    }

}, {
    sequelize,
    modelName: 'car',
    underscored: true, // True: car_brands || False: carBrands
    freezeTableName: true, // True: car || False: cars
    createdAt: true, // Tilføjer createdAt felt
    updatedAt: true, // Tilføjer updatedAt felt
})