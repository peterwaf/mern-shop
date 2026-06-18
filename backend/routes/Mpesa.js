const express = require("express");
const router = express.Router();

const {stkPush} = require("../controllers/mpesaControllers/stkPush");

router.post("/api/v1/mpesa/stkpush", stkPush);

router.post("/callback", (req, res) => {
  console.log("Callback received:", JSON.stringify(req.body, null, 2));
  res.status(200).send("Callback received");
});

module.exports = router;