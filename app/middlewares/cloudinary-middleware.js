const cloudinary = require("../../config/cloudinary");
const getPublicId = require("../../utils/getPublicId");

exports.cloudinaryUpload = async (req, res, next) => {
    try {
      if (req.car?.id) {
				// if the image file is empty, then continue without uploading files
        if (!req.file) {
          next();
          return;
        }
				// Delete old image file
        const publicId = getPublicId(req.car.image);
        await cloudinary.uploader.destroy(publicId);
      }
  
      const fileBase64 = req.file.buffer.toString("base64"); // Convert file buffer to base64
      const file = `data:${req.file.mimetype};base64,${fileBase64}`;
      const folderName = "binar-challenge04"; // Folder in cloudinary 
  
      const uploadImage = await cloudinary.uploader.upload(file, {
        folder: folderName,
      });
      
      req.image = uploadImage.secure_url;
      next();
    } catch (error) {
      req.flash("error", error.message);
      res.redirect("/");
    }
};

exports.cloudinaryDelete = async (req, res, next) => {
  try {
    const publicId = getPublicId(req.car.image);
    await cloudinary.uploader.destroy(publicId);

    next();
  } catch (error) {
    res.cookie("errorMsg", error.message);
    res.redirect("back");
  }
};