const axios = require("axios");
const { getToken } = require("./getToken");

const stkPush = async (req, res) => {
  const { phone, amount } = req.body;

  try {
    const token = await getToken();
    const timestamp = new Date()
      .toISOString()
      .replace(/[^0-9]/g, "")
      .slice(0, 14);
    const password = Buffer.from(
      process.env.MPESA_SHORTCODE + process.env.MPESA_PASSKEY + timestamp
    ).toString("base64");

    const payload = {
      BusinessShortCode: process.env.MPESA_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phone,
      PartyB: process.env.MPESA_SHORTCODE,
      PhoneNumber: phone,
      CallBackURL: process.env.MPESA_CALLBACK_URL,
      AccountReference: "Test123",
      TransactionDesc: "Payment for goods",
    };

    const response = await axios.post(
      `${process.env.MPESA_BASE_URL}/mpesa/stkpush/v1/processrequest`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    res
      .status(200)
      .json({ message: "STK Push initiated", data: response.data });
  } catch (error) {
    console.error("STK Push error", error.response?.data || error.message);
    res.status(500).json({ error: "STK Push failed" });
  }
};

module.exports = { stkPush };