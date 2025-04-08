const Image = require("../../models/Image");
const cloudinary = require("cloudinary").v2;
const cloudinaryBuildUrl = require("cloudinary-build-url");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const deleteImage = async (req, res) => {
  try {
    const image = await Image.findByIdAndDelete(req.params.id);
    // Delete the image from Cloudinary
    const oldImage = image.image; //URL
    const publicId = cloudinaryBuildUrl.extractPublicId(oldImage);
    await cloudinary.uploader.destroy(publicId);
    if (!image) {
      return res
        .status(404)
        .json({ status: "error", error: "Image not found" });
    }
    res
      .status(200)
      .json({ status: "success", message: "Image deleted successfully",_id : image._id});
  } catch (error) {
    console.error("Error while deleting image:", error);
    res.status(500).json({ status: "error", error: "Internal Server Error", message: error.message });
  }
};

module.exports = { deleteImage };
