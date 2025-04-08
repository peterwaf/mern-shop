const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const resetPassword = async (req, res) => {
  try {
    const token = req.params.token;
    const { password } = req.body;
    const userData = jwt.verify(token, process.env.JWT_SECRET);
    if (!userData) {
      return res.status(404).json({ status: "error", error: "User not found" });
    }
    const user = await User.findById(userData.id);
    user.password = password;
    await user.save();
    res
      .status(200)
      .json({ status: "success", message: "Password reset successfully" });
   
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", error: "Internal Server Error, Contact Admin" });
  }
};

module.exports = { resetPassword };
