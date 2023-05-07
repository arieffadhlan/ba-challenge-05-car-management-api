const carService = require("../../../services/car-service.js");

const getCars = async (req, res) => {
  try {
    const cars = await carService.getCars();
    res.status(200).json({
      status: "Success",
      data: cars
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message
    });
  }
}

const getCar = async (req, res) => {
  try {
    const id = req.params.id;
    const car = carService.getCar(id);

    if (!car) {
      res.status(car.status_code).json({
        status: car.status,
        message: car.message
      });
      return;
    }
  } catch (error) {
    res.status(422).json({
      status: "Error",
      message: error.message
    });
  }
}

module.exports = {
  getCars,
  getCar
}