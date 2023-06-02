const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const couponSchema = new Schema(
  {
    discountPercentage: {
      type: String,
      required: true,
    },
    validBefore: {
      type: Date,
      required: true,
    },
    couponName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Coupon = mongoose.model("Coupon", couponSchema);

module.exports = Coupon;
