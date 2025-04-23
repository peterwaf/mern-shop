const Category = require("../../models/Category");

const updateCategory = async (req,res) => {
    try {
        const foundCategory = res.category; // Access the category object from the middleware
        const foundCategoryId = foundCategory._id;
        const updatedCategory = await Category.findByIdAndUpdate(foundCategoryId, {name: req.body.name}, {new: true}); 
        res.status(200).json({ status: "success", updatedCategory, message: "Category updated successfully" }); 
    } catch (error) {
        console.error("Error while updating category:", error);
        res.status(500).json({ status: "error", error: "Internal Server Error" }); 
    }
};

module.exports = { updateCategory };