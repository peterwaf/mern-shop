const Image = require("../../models/Image");
const formidable = require("formidable");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const addImage = async (req, res) => {
  const form = new formidable.IncomingForm();

  try {
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });
    const name = fields.name?.[0];
    const altText = fields.altText?.[0];
    const isFeatured = fields.isFeatured?.[0];
    const productId = req.params.id;
    const imageFilePath = files.image[0].filepath;

    if (
      name === "" ||
      altText === "" ||
      isFeatured === "" ||
      productId === "" ||
      imageFilePath === ""
    ) {
      return res.status(400).json({
        status: "error",
        error:
          "Empty fields not allowed",
      });
    }

    const imageToUpload = await cloudinary.uploader.upload(imageFilePath, {
      folder: "benzy-shop/products",
      resource_type: "image",
    });

    // Get the secure URL of the uploaded image
    const imageUrl = imageToUpload.secure_url;

    // Save the image details to the database
    const image = imageUrl;
    const newImage = new Image({ name, altText, isFeatured, image, productId });
    const savedImage = await newImage.save();
    res.status(201).json({ status: "success", data: savedImage, message: "Image added successfully" });
  } catch (error) {
    console.error("Error while adding image:", error);
    res.status(500).json({ status: "error", error: "Internal Server Error", message: error.message });
  }
};

module.exports = { addImage };
