const mongoose = require("mongoose");
const Booking = require("../models/bookings");
const User = require("../models/user");
const Bus = require("../models/bus");
const HttpError = require("../utils/error");
const logger = require("../logger/index.js");

const createNewBooking = async (request, response) => {
  try {
    const userId = request.userId;
    const { movieId, bookingDate, source, destination, seatNo, amount } =
      request.body;

    const booking = new Booking({
      userId: userId,
      movieId: movieId,
      bookingDate: bookingDate,
      seatNo: seatNo,
      amount: amount,
    });

    let user = await User.findById(userId);
    let bus = await Bus.findById(movieId);

    if (!user) throw new HttpError("No user found", 404);
    if (!bus) throw new HttpError("No bus found", 404);

    const session = await mongoose.startSession();
    session.startTransaction({ session: session });
    await booking.save({ session: session });
    bus.seats[seatNo - 1].isBooked = true;
    await bus.save({ session: session });
    user.bookings.push(booking);
    await user.save({ session: session });
    await session.commitTransaction();

    logger.info(`Booking created successfully ${booking._id}`);
    response
      .status(201)
      .json({ message: "Booking created successfully", booking: booking });
  } catch (error) {
    logger.error(
      `An error occurred while creating the booking, ERROR : ${error.message}`
    );
    response.status(error.code).json({
      message: "An error occurred while creatig the booking",
      error: error.message,
    });
  }
};

const cancelBooking = async (request, response) => {
  try {
    const bookingId = request.params.bookingId;
    let booking = await Booking.findById(bookingId);
    if (!booking) throw new HttpError("No booking found", 404);

    let bus = await Bus.findById(booking.movieId);

    const session = await mongoose.startSession();
    session.startTransaction({ session: session });
    booking.status = "Cancelled";
    await booking.save({ session: session });
    bus.seats[booking.seatNo - 1].isBooked = false;
    await bus.save({ session: session });
    await session.commitTransaction();

    logger.info(`Booking cancelled successfully ${bookingId}`);
    response.status(200).json({ message: "Booking cancelled successfully" });
  } catch (error) {
    logger.error(
      `An error occurred while cancelling the booking, ERROR : ${error.message}`
    );
    response.status(error.code).json({
      message: "An error occurred while cancelling the booking",
      error: error.message,
    });
  }
};

const getUserUpcomingBookings = async (request, response) => {
  try {
    const bookings = await Booking.find({
      userId: request.userId,
      status: "Booked",
    }).populate("movieId");

    logger.info(
      `Upcomming Bookings fetched succcessfully for ${request.userId}`
    );
    response
      .status(200)
      .json({ message: "Bookings fetched", bookings: bookings });
  } catch (error) {
    logger.error(
      `An error occurred while fetching the bookings, ERROR : ${error.message}`
    );
    response.status(error.code).json({
      message: "An error occurred while fetching the bookings",
      error: error.message,
    });
  }
};

const getUserPastBookings = async (request, response) => {
  try {
    const bookings = await Booking.find({
      userId: request.userId,
      status: { $ne: "Booked" },
    }).populate("movieId");

    logger.info(`past Bookings fetched succcessfully for ${request.userId}`);

    response
      .status(200)
      .json({ message: "Bookings fetched", bookings: bookings });
  } catch (error) {
    logger.error(
      `An error occurred while fetching the bookings, ERROR : ${error.message}`
    );
    response.status(error.code).json({
      message: "An error occurred while fetching the bookings",
      error: error.message,
    });
  }
};

module.exports = {
  createNewBooking,
  cancelBooking,
  getUserUpcomingBookings,
  getUserPastBookings,
};
