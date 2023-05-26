const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Food extends Model {}

Food.init(
  {
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
    Ingredients: {
      type: DataTypes.STRING,
    },
    directions: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    cook_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    comments: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    _id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Food',
  }
);

module.exports = Food;
