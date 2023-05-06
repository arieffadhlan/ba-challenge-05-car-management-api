const express = require("express");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../docs/openapi.json');
const controllers = require("../app/controllers/api/v1");

const router = express.Router(); 

// Swagger UI Documentation
router.use("/", swaggerUi.serve);
router.get("/", swaggerUi.setup(swaggerDocument));

// User
router.get("/api/v1/users",
  controllers.userController.authorize,
  controllers.userController.authorizeAdmin,
  controllers.userController.getUsers
);
router.get("/api/v1/users/whoami", 
  controllers.userController.authorize,
  controllers.userController.whoAmI
);
router.post("/api/v1/register", controllers.userController.register);
router.post("/api/v1/register/admin", 
  controllers.userController.authorize,
  controllers.userController.authorizeSuperadmin,
  controllers.userController.registerAdmin
);
router.post("/api/v1/login", controllers.userController.login);

// Car



module.exports = router;
