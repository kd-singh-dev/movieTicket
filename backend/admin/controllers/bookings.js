const Booking = require("../../models/bookings");
const HttpError = require("../../utils/error");
const logger = require("../../logger/index.js");

const completeBooking = async (request, response) => {
  try {
    const bookingId = request.params.bookingId;
    let booking = await Booking.findById(bookingId).populate("userId");

    if (!booking) return HttpError("No booking found", 404);

    booking.status = "Completed";
    await booking.save();
    logger.info(`Booking completed successfully ID ${bookingId} `);
    response.status(200).json({ message: "Booking completed successfully" });
  } catch (error) {
    logger.error(
      `An error occurred while completing the booking, ERROR : ${error.message}`
    );
    response.status(error.code).json({
      message: "An error occurred while completing the booking",
      error: error.message,
    });
  }
};

const getUpcomingBookings = async (request, response) => {
  try {
    const bookings = await Booking.find({ status: "Booked" })
      .populate("userId")
      .populate("movieId");

    logger.info(`Upcomming bookings fetched successfully from admin console `);

    response
      .status(200)
      .json({ message: "Bookings fetched successfully", bookings: bookings });
  } catch (error) {
    logger.error(
      `An error occurred while getting the bookings, ERROR : ${error.message}`
    );
    response.status(error.code).json({
      message: "An error occurred while getting the bookings",
      error: error.message,
    });
  }
};

const getCompletedBookings = async (request, response) => {
  try {
    const bookings = await Booking.find({ status: "Completed" })
      .populate("userId")
      .populate("movieId");
    logger.info(`Completed bookings fetched successfully from admin console `);

    response
      .status(200)
      .json({ message: "Bookings fetched successfully", bookings: bookings });
  } catch (error) {
    logger.error(
      `An error occurred while getting the bookings, ERROR : ${error.message}`
    );
    response.status(error.code).json({
      message: "An error occurred while getting the bookings",
      error: error.message,
    });
  }
};

const getCancelledBookings = async (request, response) => {
  try {
    const bookings = await Booking.find({ status: "Cancelled" })
      .populate("userId")
      .populate("movieId");
    logger.info(`Cancelled bookings fetched successfully from admin console `);
    response
      .status(200)
      .json({ message: "Bookings fetched successfully", bookings: bookings });
  } catch (error) {
    logger.error(
      `An error occurred while getting the bookings, ERROR : ${error.message}`
    );
    response.status(error.code).json({
      message: "An error occurred while getting the bookings",
      error: error.message,
    });
  }
};

const getBookingsByBusId = async (request, response) => {
  try {
    const busId = request.params.busId;
    const bookings = await Booking.find({ busId: busId })
      .populate("userId")
      .populate("movieId");

    logger.info(`fetched booking by bus ID ${busId} successful `);

    response
      .status(200)
      .json({ message: "Bookings fetched successfully", bookings: bookings });
  } catch (error) {
    logger.error(
      `An error occurred while getting the bookings, ERROR : ${error.message}`
    );
    response.status(error.code).json({
      message: "An error occurred while getting the bookings",
      error: error.message,
    });
  }
};

module.exports = {
  completeBooking,
  getUpcomingBookings,
  getCompletedBookings,
  getCancelledBookings,
  getBookingsByBusId,
};
