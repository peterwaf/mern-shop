const User = require("../models/User");

const findUser = async (req, res, next) => {
  let selectedUser;
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ status: "error", error: "User not found" });
    }
    selectedUser = user;
  } catch (error) {
    console.error("Error while finding user:", error);
    res.status(500).json({ status: "error", error: "Internal Server Error" });
  }
  res.user = selectedUser;
  next();
};

module.exports = { findUser };
