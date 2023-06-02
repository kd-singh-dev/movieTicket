const Bus = require("../models/bus");
const logger = require("../logger/index.js");

const getAvailableBuses = async (request, response) => {
  try {
    const { name, city, date } = request.params;

    let movies = await Bus.find({
      name: name,
      city: city,
      dateOfShow: date,
    });

    logger.info("available movies found");

    response.status(200).json({ message: "Movies found", movies: movies });
  } catch (error) {
    logger.error(
      `An error occurred while getting available buses, ERROR : ${error.message}`
    );
    response.status(error.code).json({
      message: "An error occurred while getting available buses",
      error: error.message,
    });
  }
};

const getBusById = async (request, response) => {
  try {
    const { busId } = request.params;
    let bus = await Bus.findById(busId);
    logger.info(`Bus with id ${busId} found`);
    response.status(200).json({ message: "Bus found", bus: bus });
  } catch (error) {
    logger.error(
      `An error occurred while getting bus details, ERROR : ${error.message}`
    );
    response.status(error.code).json({
      message: "An error occurred while getting bus details",
      error: error.message,
    });
  }
};

module.exports = { getAvailableBuses, getBusById };
