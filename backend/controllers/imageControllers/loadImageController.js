const Image =  require("../../models/Image");

const loadImage = async (req, res) => {
    try {
        const image = await Image.findById(req.params.id);
        if (!image) {
            return res.status(404).json({ status: "error", error: "Image not found" });
        }
        res.status(200).json({ status: "success", image, message: "Image loaded successfully" });
    } catch (error) {
        console.error("Error while loading image:", error);
        res.status(500).json({ status: "error", error: "Internal Server Error" });
    }
};

module.exports = { loadImage };