const Image = require("../../models/Image");

const loadProductImages = async (req, res) => {
  const productId = req.params.id;
  try {
    const productImages = await Image.find({ productId: productId });
    if (!productImages) {
      res
        .status(404)
        .json({
          status: "error",
          error: "Product images not found",
          message: "Product images not found",
        });
    }
    res
      .status(200)
      .json({
        status: "success",
        productImages,
        message: "Product images loaded successfully",
      });
  } catch (error) {
    res
      .status(500)
      .json({
        status: "error",
        error: "Internal Server Error",
        message: error.message,
      });
  }
};

module.exports = { loadProductImages };
