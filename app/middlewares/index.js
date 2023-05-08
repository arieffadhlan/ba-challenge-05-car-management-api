const authorizeMiddleware = require("./authorize-middleware.js");
const carMiddleware = require("./car-middleware.js");
const cloudinaryMiddleware = require("./cloudinary-middleware.js");
const imageMiddleware = require("./image-middleware.js");

module.exports = {
  authorizeMiddleware,
  carMiddleware,
  cloudinaryMiddleware,
  imageMiddleware
}