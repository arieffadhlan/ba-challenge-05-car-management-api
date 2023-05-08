const carService = require("../../../services/car-service.js");

const getCars = async (req, res) => {
  try {
    const cars = await carService.getCars();
    res.status(200).json({
      status: "Success",
      data: cars
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      message: error.message
    });
  }
}

const getCar = async (req, res) => {
  try {
    const id = req.params.id;
    const car = await carService.getCar(id);

    if (!car.data) {
      res.status(car.status_code).json({
        status: "Error",
        message: car.message
      });
      return;
    }

    res.status(200).json({
      status: "Success",
      data: car.data
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      message: error.message
    });
  }
}

const addCar = async (req, res) => {
  try {
    const car = await carService.addCar(req);
    res.status(201).json({
      status: "Success",
      message: car.message,
      data: {
        id: car.data.id,
        name: car.data.name,
        rentPerDay: car.data.rentPerDay,
        size: car.data.size,
        image: car.data.image,
        available: car.data.available,
        createdAt: car.data.createdAt,
        updatedAt: car.data.updatedAt
      },
    });    
  } catch (error) {
    res.status(422).json({
      status: "Error",
      message: error.message
    });
  }
}

const updateCar = async (req, res) => {
  try {
    await carService.updateCar(req);
    res.status(200).json({
      status: "Success",
      message: "Car has been updated successfully.",
    });
  } catch (error) {
    res.status(422).json({
      status: "Error",
      message: error.message
    });
  }
}

const deleteCar = async (req, res) => {
  try {
    await carService.deleteCar(req);
    res.status(200).json({
      status: "Success",
      message: "Car has been deleted successfully.",
    });
  } catch (error) {
    res.status(422).json({
      status: "Error",
      message: error.message
    });
  }
}

module.exports = {
  getCars,
  getCar,
  addCar,
  updateCar,
  deleteCar
}