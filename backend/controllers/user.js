const User = require("../models/user");
const Booking = require("../models/bookings");
const HttpError = require("../utils/error");
const logger = require("../logger/index.js");

const getLoggedInUser = async (request, response) => {
  try {
    const userId = request.userId;
    const user = await User.findById(userId);

    if (!user) {
      throw new HttpError("No user found", 404);
    }

    logger.info(`User ${user._id} profile fetched Successfullt `);

    response
      .status(200)
      .json({ message: "User profile fetched successfully", user: user });
  } catch (error) {
    logger.error(
      `An error occurred while fetching the profile, ERROR : ${error.message}`
    );
    response.status(error.code).json({
      message: "An error occurred while fetching user profile",
      error: error.message,
    });
  }
};

const getCurrentUserBookings = async (request, response) => {
  try {
    const userId = request.userId;
    const bookings = await Booking.find({ userId: userId });

    logger.info(`Current bookings of user ${userId} fetched successfully`);
    response
      .status(200)
      .json({ message: "Bookings fetched successfully", bookings: bookings });
  } catch (error) {
    logger.error(
      `An error occurred while fetching the bookings, ERROR : ${error.message}`
    );
    response.status(error.code).json({
      message: "An error occurred while fetching user bookings",
      error: error.message,
    });
  }
};

module.exports = { getLoggedInUser, getCurrentUserBookings };
