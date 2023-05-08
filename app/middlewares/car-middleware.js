const carService = require("../services/car-service.js");

const isCarExists = async (req, res, next) => {
	try {
		const id = req.params.id
		const car = await carService.getCarById(id);
		
		if (car.status == "Error") {
			res.status(404).json({
				status: "Error",
				message: "Car not found.",
			});
			return;
		}

		req.car = car;
		next();
	} catch (error) {
		res.status(400).json({
			status: "Error",
			message: error.message,
		});
	}
}

module.exports = {
  isCarExists
}