const express = require("express");
const {
  createNewBooking,
  cancelBooking,
  getUserUpcomingBookings,
  getUserPastBookings,
} = require("../controllers/bookings");
const { checkLogin } = require("../utils/auth-utility");

const router = express.Router();

router.get("/upcoming", checkLogin, getUserUpcomingBookings);
router.get("/past", checkLogin, getUserPastBookings);

router.post("/", checkLogin, createNewBooking);

router.patch("/cancel/:bookingId", checkLogin, cancelBooking);

module.exports = router;
