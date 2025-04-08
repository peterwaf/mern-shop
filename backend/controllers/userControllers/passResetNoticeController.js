const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const { sendEmail } = require("../functions/sendMail");

const passResetNotice = async (req, res) => {
  try {
    const { email } = req.body;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
      return res
        .status(400)
        .json({ status: "error", error: "Invalid email format" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ status: "error", error: "No account associated with this email address found, please sign up or enter a valid email" });
    }
    const userToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    const to = email;
    const subject = "ShopEasy : Password Reset Link";
    const from = process.env.FROM_EMAIL;
    const text = `Hi ${user.firstName},\n Click the link below to reset your password:\n${process.env.CLIENT_URL}/reset-password/${userToken} \n\nBest regards,\nShop Easy Team`;
    const html = `Hi ${user.firstName},<br><br>Click the link below to reset your password:<br><a href="${process.env.CLIENT_URL}/reset-password/${userToken}">Click here to reset your password</a>
        <br><br>Best regards,<br>Easy Shop Team`;
    sendEmail(from, to, subject, text, html);
    res
      .status(200)
      .json({
        status: "success",
        message: "Sent,Check your email for password reset",
      });
  } catch (error) {
    console.error("Error while sending password reset email:", error);
    res.status(500).json({ status: "error", error: "Internal Server Error" });
  }
};

module.exports = { passResetNotice };
