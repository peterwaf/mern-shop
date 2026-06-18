// Get access token
const getToken = async () => {
  const url = `${process.env.MPESA_BASE_URL}/oauth/v1/generate?grant_type=client_credentials`;
  const auth = Buffer.from(`${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`).toString("base64");

  const res = await axios.get(url, {
    headers: { Authorization: `Basic ${auth}` },
  });

  return res.data.access_token;
};

module.exports = { getToken };
