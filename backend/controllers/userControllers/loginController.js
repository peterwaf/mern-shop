const User = require("../../models/User");
const jwt = require("jsonwebtoken");

const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: "error", error: "Email and password are required" });
    }
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ status: "error", error: "Invalid email format" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({
          status: "error",
          error: "Password must be at least 8 characters long",
        });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ status: "error", error: "User not found" });
    }
    //compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ status: "error", error: "Invalid password" });
    }
    const token = jwt.sign(
      { userId: user._id, role: user.role, email: user.email, firstName: user.firstName },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res
      .status(200)
      .json({ status: "success", message: "Login successful",firstName:user.firstName,token: token });
  } catch (error) {
    console.error("Error while logging in:", error);
    res.status(500).json({ status: "error", error: "Internal Server Error" });
  }
};

module.exports = { logIn };
