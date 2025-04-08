const User = require("../../models/User");
const deleteUser = async (req,res) => {
    const userId = res.user._id; // Access the user object from the middleware\
    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
          return res.status(404).json({ status: "error", error: "User not found" });
        }
        res.status(200).json({ status: "success", message: "User deleted successfully" });
      } catch (error) {
        console.error("Error while deleting user:", error);
        res.status(500).json({ status: "error", error: "Internal Server Error" });
      }
}

module.exports = {deleteUser}