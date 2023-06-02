const mongoose = require("mongoose");
const logger = require("../logger/index.js");
let db;

const connectDB = (callback) => {
  mongoose
    .connect(process.env.MONGODB)
    .then((_db) => {
      db = _db;
      return "Connected to MongoDB";
    })
    .then((message) => {
      logger.info(message);
      callback();
    })
    .catch((error) => {
      logger.error(
        `Error while connecting to the database, ERROR : ${error.message}`
      );
    });
};

module.exports = { db, connectDB };
