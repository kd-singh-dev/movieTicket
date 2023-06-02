const Bus = require("../../models/bus");
const User = require("../../models/user");
const Coupons = require("../../models/coupons");
const Bookings = require("../../models/bookings");
const logger = require("../../logger/index.js");
const getStats = async (request, response) => {
  try {
    let bus = await Bus.countDocuments({});
    let completedBookings = await Bookings.countDocuments({
      status: "Completed",
    });
    let cancelledBookings = await Bookings.countDocuments({
      status: "Cancelled",
    });
    let upcomingBookings = await Bookings.countDocuments({
      status: "Booked",
    });
    let coupons = await Coupons.countDocuments({});
    let users = await User.countDocuments({ roleId: 1 });

    logger.info(`All stats fetched successfully`);

    response.status(200).json({
      message: "Stats fetched",
      stats: {
        bus,
        completedBookings,
        cancelledBookings,
        upcomingBookings,
        coupons,
        users,
      },
    });
  } catch (error) {
    logger.error(
      `An error occurred while fetching stats, ERROR : ${error.message}`
    );
    response.status(error.code).json({
      message: "An error occurred while fetching stats",
      error: error.message,
    });
  }
};

module.exports = { getStats };
