const mongoose = require("mongoose");
const imageSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      altText: {
        type: String,
        default: "",
      },
      isFeatured: {
        type: Boolean,
        default: false,
      },
      image: {
        type: String,
        required: true,
      },
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true, // Ensures every image is linked to a product
      },
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("Image", imageSchema);
  