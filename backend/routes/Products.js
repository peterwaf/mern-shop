const express = require("express");
const router = express.Router();

//controllers

const {addProduct} = require("../controllers/productControllers/addProductController");
const {getProducts} = require("../controllers/productControllers/getProductsController");
const {loadProduct} = require("../controllers/productControllers/loadProductController");
const {deleteProduct} = require("../controllers/productControllers/deleteProductControler");
const {updateProduct} = require("../controllers/productControllers/updateProductController");

//middlewares

const {findProduct} = require("../middlewares/findProduct");

//add product

router.post("/api/v1/products/add", addProduct);

//get all products

router.get("/api/v1/products/all", getProducts);

//load product

router.get("/api/v1/products/load/:id", findProduct, loadProduct);

//delete product

router.delete("/api/v1/products/delete/:id", findProduct, deleteProduct);

//update product

router.patch("/api/v1/products/update/:id", findProduct, updateProduct);



module.exports = router;