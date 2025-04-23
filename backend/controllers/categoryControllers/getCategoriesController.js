const Category = require("../../models/Category");
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({ status: "success", data: categories });
    } catch (error) {
        console.error("Error while getting categories:", error);
        res.status(500).json({ status: "error", error: "Internal Server Error" });
    }
}

module.exports = { getCategories };