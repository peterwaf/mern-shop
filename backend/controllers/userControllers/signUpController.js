const User = require("../../models/User");
const { sendEmail } = require("../../controllers/functions/sendMail");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!firstName || !lastName || !email || !password) {
      return res
        .status(400)
        .json({ status: "error", error: "All fields are required" });
    }
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ status: "error", error: "Invalid email format" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: "error",
        error: "Email account exists, login instead",
      });
    }
    const user = new User({ firstName, lastName, email, password });
    await user.save();
    const userToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const to = email;
    const subject = "ShopEasy : Account Verification";
    const text = `Hi ${firstName},\n An account has been created for you at our website.\nClick the link below to verify your account:\n${process.env.SERVER_URL}/api/v1/verify-account/${userToken} \n\nBest regards,\nShopEasy Team`;
    const html = `Hi ${firstName},<br><br>An account has been created for you at our website.<br><a href="${process.env.SERVER_URL}/api/v1/verify-account/${userToken}">Click here to verify your account</a>
        <br><br>Best regards,<br> ShopEasy Team`;
    sendEmail(process.env.FROM_EMAIL, to, subject, text, html);
    res
      .status(201)
      .json({ status: "success", message: "User created successfully" });
  } catch (error) {
    console.error("Error while creating user:", error);
    res.status(500).json({ status: "error", error: "Internal Server Error" });
  }
};

module.exports = { signUp };
