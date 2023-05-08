const cloudinary = require("../../config/cloudinary.js");

const folderName = "binar-challenge05"; // Folder in cloudinary 

const getPublicId = (image) => {
  if (!image) return "";

  const CLOUDINARY_REGEX = /^.+\.cloudinary\.com\/(?:[^\/]+\/)(?:(image|video|raw)\/)?(?:(upload|fetch|private|authenticated|sprite|facebook|twitter|youtube|vimeo)\/)?(?:(?:[^_/]+_[^,/]+,?)*\/)?(?:v(\d+|\w{1,2})\/)?([^\.^\s]+)(?:\.(.+))?$/;
  const parts = CLOUDINARY_REGEX.exec(image);
  return parts && parts.length > 2 ? parts[parts.length - 2] : image;
};

const uploadImage = async (file) => {
  return await cloudinary.uploader.upload(file, {
    folder: folderName,
  });
};

const deleteImage = async (image) => {
  const publicId = getPublicId(image);
  return await cloudinary.uploader.destroy(publicId);
};

module.exports = {
  uploadImage,
  deleteImage
}