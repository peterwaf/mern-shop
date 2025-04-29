const Category = require("../../models/Category");

const addCategory = async (req, res) => {
    try {
        const name = req.body.name;
        
        if (!name) {
            return res.status(400).json({ status: "error", error: "Category name is required",message: "Category name is required" });
        }
        const category = new Category({ name });
        const savedCategory = await category.save();
        res.status(201).json({ status: "success", savedCategory, message: "Category added successfully" });
    } catch (error) {
        console.error("Error while adding category:", error);
        res.status(500).json({ status: "error", error: "Internal Server Error", message: "Error while adding category" });
    }
};

module.exports = { addCategory };