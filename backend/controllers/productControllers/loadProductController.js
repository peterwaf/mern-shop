const loadProduct = async (req, res) => {
  try {
    const product = res.product; // Access the product object from the middleware
    res.status(200).json({ status: "success", data: product });
  } catch (error) {
    console.error("Error while loading product:", error);
    res.status(500).json({ status: "error", error: "Internal Server Error", message: "Error while loading product" });
  }
};

module.exports = { loadProduct };
