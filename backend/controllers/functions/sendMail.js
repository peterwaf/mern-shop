const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.FROM_EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

function sendEmail(from, to, subject, text, html) {
  var mailOptions = {
    from: from,
    to: to,
    subject: subject,
    text: text,
    html: html,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      throw error; // Properly propagating the error
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}


module.exports = { sendEmail };