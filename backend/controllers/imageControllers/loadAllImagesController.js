const Image = require("../../models/Image");

const loadAllImages = async (req, res) => {
    try {
        const images = await Image.find();
        res.status(200).json({ status: "success", images });
    } catch (error) {
        console.error("Error while loading images:", error);
        res.status(500).json({ status: "error", error: "Internal Server Error" });
    }
};

module.exports = { loadAllImages };