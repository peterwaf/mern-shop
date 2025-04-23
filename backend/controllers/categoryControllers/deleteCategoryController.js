const Category = require("../../models/Category");

const deleteCategory = async (req, res) => {
  try {
    const foundCategory = res.category; // Access the category object from the middleware
    const foundCategoryId = foundCategory._id;
    const deletedCategory = await Category.findByIdAndDelete(foundCategoryId);
    // just a fallback but not needed since the middleware will return a 404
    if (!deletedCategory) {
      return res
        .status(404)
        .json({ status: "error", error: "Category not found" });
    }
    res
      .status(200)
      .json({ status: "success", deletedCategory, message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error while deleting category:", error);
    res.status(500).json({ status: "error", error: "Internal Server Error" });
  }
};

module.exports = { deleteCategory };
