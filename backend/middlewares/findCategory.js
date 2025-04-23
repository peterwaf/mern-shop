const Category = require("../models/Category");
const findCategory = async (req, res, next) => {
    let selectedCategory;
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ status: "error", error: "Category not found" });
        }
        selectedCategory = category;
    } catch (error) {
        console.error("Error while finding category:", error);
        res.status(500).json({ status: "error", error: "Internal Server Error" });
    }
    res.category = selectedCategory;
    next();
}

module.exports = { findCategory };