"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Car, {
        foreignKey: "created_by",
        as: "created"
      });
      this.hasMany(models.Car, {
        foreignKey: "updated_by",
        as: "updated"
      });
      this.hasMany(models.Car, {
        foreignKey: "deleted_by",
        as: "deleted"
      });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: "User",
  });
  return User;
};