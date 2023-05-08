const cloudinaryService = require("../services/cloudinary-service.js");

const cloudinaryUpload = async (req, res, next) => {
    try {
      if (req.car?.id) {
				// if the image file is empty, then continue without uploading files
        if (!req.file) {
          next();
          return;
        }
				// Delete old image file
        await cloudinaryService.deleteImage(req.car.image)
      }
  
      const fileBase64 = req.file.buffer.toString("base64"); // Convert file buffer to base64
      const file = `data:${req.file.mimetype};base64,${fileBase64}`;
      const imagePayload = await cloudinaryService.uploadImage(file);
      
      req.image = imagePayload.secure_url;
      next();
    } catch (error) {
      res.status(422).json({
        status: "Error",
        message: "Image cannot be uploaded."
      });
    }
};

const cloudinaryDelete = async (req, res, next) => {
  try {
    await cloudinaryService.deleteImage(req.car.image);

    next();
  } catch (error) {
    res.status(422).json({
      status: "Error",
      message: "Image cannot be deleted."
    });
  }
};

module.exports = {
  cloudinaryUpload,
  cloudinaryDelete
}