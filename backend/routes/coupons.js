const express = require("express");
const { getAllValidCoupons } = require("../controllers/coupons");
const { checkLogin } = require("../utils/auth-utility");

const router = express.Router();

router.get("/", checkLogin, getAllValidCoupons);

module.exports = router;
