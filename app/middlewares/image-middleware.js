const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage();
const fileExtensions = [".png", ".jpg", ".jpeg"];

const imageFilter = (req, file, callback) => {
  let fileExtension = path.extname(file.originalname);
  if (fileExtensions.includes(fileExtension)) {
    return callback(null, true);
  }
  callback(null, false);
  callback(new Error("File gambar harus berupa png, jpg, atau jpeg."));
};

const upload = multer({
  storage: storage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 209715, // 2 mb
  },
}).single("image");

const imageUploader = (req, res, next) => {
  upload(req, res, function (error) {
    if (error instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      res.status(400).json({
        status: "Error",
        message: error.message
      });
      return;
    } else if (error) {
      // An unknown error occurred when uploading.
      res.status(400).json({
        status: "Error",
        message: error.message
      });
      return;
    }
    next();
  });
};

module.exports = {
  imageUploader
}