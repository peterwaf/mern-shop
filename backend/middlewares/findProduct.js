const Product = require("../models/Product");

const findProduct = async (req, res, next) => {
    let selectedProduct;
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ status: "error", error: "Product not found" });
        }
        selectedProduct = product;
    } catch (error) {
        console.error("Error while finding product:", error);
        res.status(500).json({ status: "error", error: "Internal Server Error" });
    }
    res.product = selectedProduct;
    next();
};

module.exports = { findProduct };