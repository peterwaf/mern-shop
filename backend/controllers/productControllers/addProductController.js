const Product = require("../../models/Product");
const formidable = require("formidable");

const addProduct = async (req, res) => {
  const form = new formidable.IncomingForm();

  try {
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });
   
    const name = fields.name?.[0];
    const featured = fields.featured?.[0];
    const price = fields.price?.[0];
    const description = fields.description?.[0];
    const category = fields.category?.[0];

    if (!name || !featured || !price || !description || !category) {
      return res
        .status(400)
        .json({ status: "error", error: "All fields are required" });
    }

    const product = new Product({ name, price, description, category });
    const savedProduct = await product.save();
    res.status(201).json({ status: "success",savedProduct: savedProduct, message: "Product added successfully" });
  } catch (error) {
    console.error("Error while adding product:", error);
    res.status(500).json({ status: "error", error: error.message });
  }
};

module.exports = { addProduct };
