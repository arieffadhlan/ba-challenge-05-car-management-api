"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "created_by",
        as: "created"
      });
      this.belongsTo(models.User, {
        foreignKey: "updated_by",
        as: "updated"
      });
      this.belongsTo(models.User, {
        foreignKey: "deleted_by",
        as: "deleted"
      });
    }
  }
  Car.init({
    name: DataTypes.STRING,
    rent_per_day: DataTypes.STRING,
    size: DataTypes.STRING,
    image: DataTypes.STRING,
    available: DataTypes.BOOLEAN,
    created_by: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id"
      }
    },
    updated_by: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id"
      }
    },
    deleted_by: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id"
      }
    },
  }, {
    sequelize,
    modelName: "Car",
  });
  return Car;
};