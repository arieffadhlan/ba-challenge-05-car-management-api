const carRepository = require("../repositories/car-repository.js");

const getCars = async () => {
  try {
    const cars = await carRepository.getCars();
    return cars;
  } catch (error) {
    throw new Error(error);
  }
}

const getCar = async (id) => {
  try {
    const car = await carRepository.getCar(id);
    
    if (!car) {
      return {
        status_code: 404,
        status: "Error",
        message: "Car not found.",
      }
    }

    return {
      data: {
        id: car?.id,
        name: car?.name,
        rentPerDay: car?.rentPerDay,
        size: car?.size,
        image: car?.image,
        available: car?.available,
        createdBy: {
          name: car?.created?.name,
          email: car?.created?.email || null,
        },
        updatedBy: {
          name: car?.updated?.name || null,
          email: car?.updated?.email || null,
        },
        deletedBy: {
          name: car?.deleted?.name || null,
          email: car?.deleted?.email || null,
        },
        createdAt: car?.createdAt,
        updatedAt: car?.updatedAt,
      }
    }
  } catch (error) {
    throw new Error(error);
  }
}

const getCarById = async (id) => {
  try {
    const car = await carRepository.getCar(id);
    return car;
  } catch (error) {
    throw new Error(error);
  }
}

const addCar = async (req) => {
  const { name, rentPerDay, size, available } = req.body;
  const image = req.image;
  const { id } = req.user;

  if (!name || !rentPerDay || !size || !available) {
    throw new Error("Name, rent per day, size, and available are required.");
  }

  const car = await carRepository.createCar({
    name, 
    rentPerDay, 
    size,
    image,
    available,
    createdBy: id
  });

  return {
    message: "Car has been successfully created.",
    data: {
      id: car.id,
      name: car.name, 
      rentPerDay: car.rentPerDay, 
      size: car.size,
      image: car.image,
      available: car.available,
      createdAt: car.createdAt,
      updatedAt: car.updatedAt
    }
  }
}

const updateCar = async (req) => {
  const { name, rentPerDay, size, available } = req.body;
  const image = req.image;
  const { id } = req.user;

  if (!name || !rentPerDay || !size || !available) {
    throw new Error("Name, rent per day, size, and available are required.");
  }

  return await carRepository.updateCar(id, {
    name, 
    rentPerDay, 
    size,
    image,
    available,
    updatedBy: id
  });
}

const deleteCar = async (req) => {
  try {
    const userId = req.user.id;
    const carId = req.car.id;
    await carRepository.updateCar(carId, { deletedBy: userId });
    return await carRepository.deleteCar(carId);
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  getCars,
  getCar,
  getCarById,
  addCar,
  updateCar,
  deleteCar
}