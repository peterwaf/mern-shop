const User = require("../../models/User");

const loadUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ status: "success", data: users });
    } catch (error) {
        console.error("Error while loading users:", error);
        res.status(500).json({ status: "error", error: "Internal Server Error" });
    }
};

module.exports = { loadUsers };