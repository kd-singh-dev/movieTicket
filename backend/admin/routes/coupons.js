const express = require("express");
const { checkAdmin } = require("../../utils/auth-utility");
const {
  createNewCoupon,
  deleteCoupon,
  getAllCoupons,
} = require("../controllers/coupons");

const router = express.Router();

router.get("/", checkAdmin, getAllCoupons);

router.post("/", checkAdmin, createNewCoupon);

router.delete("/:couponId", checkAdmin, deleteCoupon);

module.exports = router;
