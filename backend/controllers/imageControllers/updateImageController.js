const Image = require("../../models/Image");
const formidable = require("formidable");
const cloudinary = require("cloudinary").v2;
const cloudinaryBuildUrl = require("cloudinary-build-url");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const updateImage = async (req, res) => {
  const form = new formidable.IncomingForm();

  try {
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    const imageId = req.params.id;
    if (!imageId) {
      return res.status(400).json({ status: "error", error: "Image ID is required" });
    }

    const imageDataToUpdate = {};

    // Check if fields exist and are not empty
    if (fields.name && fields.name[0]) imageDataToUpdate.name = fields.name[0];
    if (fields.altText && fields.altText[0]) imageDataToUpdate.altText = fields.altText[0];
    if (fields.isFeatured && fields.isFeatured[0]) imageDataToUpdate.isFeatured = fields.isFeatured[0];
    if (fields.productId && fields.productId[0]) imageDataToUpdate.productId = fields.productId[0];
  
    
    // Check if an image file is provided
    if (files.image && files.image[0] && files.image[0].filepath) {
      const imageFilePath = files.image[0].filepath;

      // Find the old/existing image in the database
      const oldImage = await Image.findById(imageId);
      if (oldImage) {
        // Delete the existing image from Cloudinary
        const publicId = cloudinaryBuildUrl.extractPublicId(oldImage.image);
        await cloudinary.uploader.destroy(publicId);
      }

      // Upload the new image to Cloudinary
      const result = await cloudinary.uploader.upload(imageFilePath);
      imageDataToUpdate.image = result.secure_url;
    }

    if (Object.keys(imageDataToUpdate).length === 0) {
      return res.status(400).json({ status: "error", error: "No valid fields provided for update" });
    }

    const updatedImage = await Image.findByIdAndUpdate(imageId, imageDataToUpdate, { new: true });

    if (!updatedImage) {
      return res.status(404).json({ status: "error", error: "Image not found" });
    }

    res.status(200).json({
      status: "success",
      updatedImage,
      message: "Image updated successfully",
    });
  } catch (error) {
    console.error("Error while updating image:", error);
    res.status(500).json({
      status: "error",
      error: error.message || "Internal Server Error",
    });
  }
};

module.exports = { updateImage };
