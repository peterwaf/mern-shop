const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const verifyUser = async (req, res) => {
  try {
    const token = req.params.token;
    //verify token
    const userData = jwt.verify(token, process.env.JWT_SECRET);
    console.log(userData);
    
    const user = await User.findById(userData.id);
    if (!user) {
      return res.status(404).json({ status: "error", error: "User not found" });
    }
    //update user status to verified
    user.isVerified = true;
    await user.save();
    //redirect to success page
    res.redirect(`${process.env.CLIENT_URL}/verify-account-success`);

  } catch (error) {
    console.log(error);
    res.redirect(`${process.env.CLIENT_URL}/verify-account-failed`);
  }
};

module.exports = { verifyUser };
