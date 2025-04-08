const formidable = require("formidable");

const updateProduct = async (req, res) => {
  const form = new formidable.IncomingForm();

  try {
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    //check if all fields are present and valid

    const productToUpdate = res.product; // Access the product object from the middleware

    const name = fields.name?.[0];
    const featured = fields.featured?.[0];
    const price = fields.price?.[0];
    const description = fields.description?.[0];
    const category = fields.category?.[0];

    if (name === "" || featured === "" || price === "" || description === "" || category === "") {
      return res.status(400).json({
        status: "error",
        error:
          "At least one valid field is required for update, empty fields not allowed",
      });
    }
    const productDetails = {};
    if (name) productDetails.name = name;
    if (featured) productDetails.featured = featured;
    if (price) productDetails.price = price;
    if (description) productDetails.description = description;
    if (category) productDetails.category = category;

    //check if at least one valid field is present

    if (Object.keys(productDetails).length === 0) {
      return res.status(400).json({
        status: "error",
        error:
          "At least one valid field is required for update, empty fields not allowed",
      });
    }

    //update the product

    if (name) productToUpdate.name = name;
    if (featured) productToUpdate.featured = featured;
    if (price) productToUpdate.price = price;
    if (description) productToUpdate.description = description;
    if (category) productToUpdate.category = category;

    const updatedProduct = await productToUpdate.save();

    res.status(200).json({ status: "success", data: updatedProduct, message: "Product info updated successfully" });
  } catch (error) {
    console.error("Error while updating product:", error);
    res.status(500).json({ status: "error", error: "Internal Server Error" });
  }
};

module.exports = { updateProduct };
