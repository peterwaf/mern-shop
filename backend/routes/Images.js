const express = require("express");
const router = express.Router();

//controllers

const {addImage} = require("../controllers/imageControllers/addImageController");
const {updateImage} = require("../controllers/imageControllers/updateImageController");
const {loadImage} = require("../controllers/imageControllers/loadImageController");
const {loadAllImages} = require("../controllers/imageControllers/loadAllImagesController");
const {deleteImage} = require("../controllers/imageControllers/deleteImageController");
const {loadProductImages} = require("../controllers/imageControllers/loadProductImagesController")

//add image

router.post("/api/v1/images/add/:id", addImage);

//update image

router.patch("/api/v1/images/update/:id", updateImage);

//load one image

router.get("/api/v1/images/load/:id", loadImage);



//load all images

router.get("/api/v1/images/all", loadAllImages);

//load product images

router.get("/api/v1/images/product/:id",loadProductImages);

//delete image

router.delete("/api/v1/images/delete/:id", deleteImage);

module.exports = router;