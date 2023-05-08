const { Car, User } = require("../models");

const getTotalCar = () => {
  return Car.count();
}

const getCars = () => {
  return Car.findAll();
}

const getCar = (id) => {
  return Car.findByPk(id, {
    include: [
      {
        model: User,
        as: "created",
      },
      {
        model: User,
        as: "updated",
      },
      {
        model: User,
        as: "deleted",
      },
    ],
    attributes: { exclude: ["createdBy", "updatedBy", "deletedBy"] },
    paranoid: false,
  });
}

const createCar = (createArgs) => {
  return Car.create(createArgs);
}

const updateCar = (id, updateArgs) => {
  return Car.update(updateArgs, 
    { where: { id } 
  });
}

const deleteCar = (id) => {
  return Car.destroy({ where: { id } });
}

module.exports = {
  getTotalCar,
  getCars,
  getCar,
  createCar,
  updateCar,
  deleteCar
};
