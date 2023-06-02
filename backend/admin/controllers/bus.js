const Bus = require("../../models/bus");
const HttpError = require("../../utils/error");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const logger = require("../../logger/index.js");
const { uploadFile, getFileStream } = require("../../utils/s3.js");

const addNewBus = async (request, response) => {
  try {
    const file = request.file;
    const result = await uploadFile(file);
    await unlinkFile(file.path);

    const { name, theater, price, city, seats, dateOfShow, timeOfShow } =
      request.body;

    const pushseats = [];

    for (let i = 0; i < seats; i++) {
      pushseats.push({
        seatNo: i + 1,
        isBooked: false,
      });
    }

    const bus = new Bus({
      name: name,
      theater: theater,
      price: price,
      city: city,
      seats: pushseats,
      dateOfShow: dateOfShow,
      timeOfShow: timeOfShow,
      imageKey: result.key,
    });

    await bus.save();
    logger.info(`New bus added successfully Bus ID is ${bus._id} `);
    response
      .status(200)
      .json({ message: "Movie added successfully", bus: bus });
  } catch (error) {
    logger.error(
      `An error occurred while adding a new bus, ERROR : ${error.message}`
    );
    response.status(error.code).json({
      message: "An error occurred while adding a new bus",
      error: error.message,
    });
  }
};

const removeBus = async (request, response) => {
  try {
    const busId = request.params.busId;

    const bus = await Bus.findById(busId);

    if (!bus) throw new HttpError("No bus found", 404);

    await bus.remove();
    logger.info(`bus removed successfully Bus ID is ${busId} `);
    response.status(200).json({ message: "Bus removed successfully." });
  } catch (error) {
    logger.error(
      `An error occurred while adding a new bus, ERROR : ${error.message}`
    );
    response.status(error.code).json({
      message: "An error occurred while adding a new bus",
      error: error.message,
    });
  }
};

const getAllUpcomingBuses = async (request, response) => {
  try {
    const buses = await Bus.find();

    logger.info(`All upcomming bookings fetched successfully`);
    response.status(200).json({ message: "Buses found", buses: buses });
  } catch (error) {
    logger.error(
      `An error occurred while adding a new bus, ERROR : ${error.message}`
    );
    response.status(error.code).json({
      message: "An error occurred while adding a new bus",
      error: error.message,
    });
  }
};

module.exports = { addNewBus, removeBus, getAllUpcomingBuses };
