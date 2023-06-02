const Razorpay = require("razorpay");
const dotenv = require("dotenv");
const express = require("express");
const router = express.Router();
dotenv.config();

var instance = new Razorpay({
  key_id: process.env.KEYID,
  key_secret: process.env.KEYSECRET,
});

router.post("/", async (req, res) => {
  var options = {
    amount: req.body.amount * 100, // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11",
  };
  instance.orders.create(options, function (err, order) {
    const orderId = order.id;
    res.json({ orderId });
  });
});

module.exports = router;
