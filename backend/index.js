const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(bodyParser.json());
//allow public access static files
app.use(express.static("public"));
app.use(cors());
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;
const UsersRoute = require("./routes/Users");
const ProductsRoute = require("./routes/Products");
const ImagesRoute = require("./routes/Images");

app.use("/", UsersRoute);
app.use("/", ProductsRoute);
app.use("/", ImagesRoute);
app.get("/", (req, res) => {
  res.send("Hello World!");
})
app
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to mongodb");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(`mongodb connection error ${error}`));

// // Export the app for Vercel
// module.exports = app;