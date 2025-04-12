const Product = require("../../models/Product");
const deleteProduct = async (req, res) => {
  const productId = res.product._id; // Access the product object from the middleware\
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ status: "error", error: "Product not found" });
    }
    res
      .status(200)
      .json({ status: "success", deletedProduct, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error while deleting product:", error);
    res.status(500).json({ status: "error", error: "Internal Server Error" });
  }
};

module.exports = { deleteProduct };
