const express = require("express");

const {
  getLoggedInUser,
  getCurrentUserBookings,
} = require("../controllers/user");
const { checkLogin } = require("../utils/auth-utility");

const router = express.Router();

router.get("/", checkLogin, getLoggedInUser);
router.get("/bookings", checkLogin, getCurrentUserBookings);

module.exports = router;
