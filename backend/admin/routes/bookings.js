const express = require("express");
const { checkAdmin } = require("../../utils/auth-utility");
const {
  completeBooking,
  getUpcomingBookings,
  getCompletedBookings,
  getCancelledBookings,
  getBookingsByBusId,
} = require("../controllers/bookings");

const router = express.Router();

router.get("/upcoming", checkAdmin, getUpcomingBookings);
router.get("/completed", checkAdmin, getCompletedBookings);
router.get("/cancelled", checkAdmin, getCancelledBookings);
router.get("/bus/:busId", checkAdmin, getBookingsByBusId);

router.patch("/complete/:bookingId", checkAdmin, completeBooking);

module.exports = router;
