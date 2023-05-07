const { Car } = require("../models");

const getTotalCar = () => {
  return Car.count();
}

const getCars = () => {
  return Car.findAll();
}

const getCar = (id) => {
  return Car.findByPk(id);
}

const getCarByEmail = (email) => {
  return Car.findOne({
    where: { email }
  });
}

const createCar = (createArgs) => {
  return Car.create(createArgs);
}

const deleteCar = (id) => {
  return Car.destroy(id);
}

module.exports = {
  getTotalCar,
  getCars,
  getCar,
  getCarByEmail,
  createCar,
  deleteCar
};
