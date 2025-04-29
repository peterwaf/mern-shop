const Category = require("../../models/Category");

const loadCategory = async (req, res) => {
    const categoryId = req.params.id;
    try {
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ status: "error", error: "Category not found", message: "Category not found" });
        }
        res.status(200).json({ status: "success", category: category });
    } catch (error) {
        console.error("Error while loading category:", error);
        res.status(500).json({ status: "error", error: "Internal Server Error", message: "Error while loading category" });
    }
}

module.exports = { loadCategory };