const Product = require("../../models/Product");

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ status: "success", data: products });
    } catch (error) {
        console.error("Error while getting products:", error);
        res.status(500).json({ status: "error", error: "Internal Server Error", message: error.message });
    }
};

module.exports = { getProducts };