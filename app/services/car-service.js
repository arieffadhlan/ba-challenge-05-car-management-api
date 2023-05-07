const carRepository = require("../repositories/car-repository.js");

const getCars = async () => {
  try {
    const cars = await carRepository.getCars();
    return cars;
  } catch (error) {
    throw new Error(error);
  }
}

const getCar = () => {

}

module.exports = {
  getCars,
  getCar
}