const express = require("express");
const router = express.Router();

//import middleware

const {findCategory} = require("../middlewares/findCategory");

//controllers

const {addCategory} = require("../controllers/categoryControllers/addCategoryController");
const {getCategories} = require("../controllers/categoryControllers/getCategoriesController")
const {deleteCategory} = require("../controllers/categoryControllers/deleteCategoryController");
const {updateCategory} = require("../controllers/categoryControllers/updateCategoryController");

router.post("/api/v1/categories/add", addCategory);
router.get("/api/v1/categories/all", getCategories);
router.delete("/api/v1/categories/delete/:id", findCategory, deleteCategory);
router.patch("/api/v1/categories/update/:id", findCategory, updateCategory);


module.exports = router;