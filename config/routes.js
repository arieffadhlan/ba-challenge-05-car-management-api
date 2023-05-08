const express = require("express");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../docs/openapi.json');
const controllers = require("../app/controllers/api/v1");
const middlewares = require("../app/middlewares");

const router = express.Router(); 

// Swagger UI Documentation
router.use("/", swaggerUi.serve);
router.get("/", swaggerUi.setup(swaggerDocument));

// User
router.get("/api/v1/users",
  middlewares.authorizeMiddleware.authorize,
  middlewares.authorizeMiddleware.authorizeAdmin,
  controllers.userController.getUsers
);
router.get("/api/v1/users/whoami", 
  middlewares.authorizeMiddleware.authorize,
  controllers.userController.whoAmI
);
router.post("/api/v1/register", controllers.userController.register);
router.post("/api/v1/register/admin", 
  middlewares.authorizeMiddleware.authorize,
  middlewares.authorizeMiddleware.authorizeSuperadmin,
  controllers.userController.registerAdmin
);
router.post("/api/v1/login", controllers.userController.login);

// Car
router.get("/api/v1/cars", 
  middlewares.authorizeMiddleware.authorize,
  controllers.carController.getCars
);
router.get("/api/v1/cars/:id", 
  middlewares.authorizeMiddleware.authorize,
  controllers.carController.getCar
);
router.post("/api/v1/cars",
  middlewares.authorizeMiddleware.authorize,
  middlewares.authorizeMiddleware.authorizeAdmin,
  middlewares.imageMiddleware.imageUploader, 
  middlewares.cloudinaryMiddleware.cloudinaryUpload, 
  controllers.carController.addCar
);
router.put("/api/v1/cars/:id", 
  middlewares.authorizeMiddleware.authorize,
  middlewares.authorizeMiddleware.authorizeAdmin,
  middlewares.carMiddleware.isCarExists, 
  middlewares.imageMiddleware.imageUploader, 
  middlewares.cloudinaryMiddleware.cloudinaryUpload, 
  controllers.carController.updateCar
);
router.delete("/api/v1/cars/:id", 
  middlewares.authorizeMiddleware.authorize,
  middlewares.authorizeMiddleware.authorizeAdmin,
  middlewares.carMiddleware.isCarExists, 
  middlewares.imageMiddleware.imageUploader, 
  middlewares.cloudinaryMiddleware.cloudinaryDelete, 
  controllers.carController.deleteCar
);

module.exports = router;
