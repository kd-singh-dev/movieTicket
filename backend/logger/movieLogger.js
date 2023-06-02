const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const movieLogger = () => {
  return createLogger({
    level: "debug",
    format: combine(timestamp(), myFormat),
    transports: [
      new transports.Console(),
      new transports.File({ filename: "movie.log" }),
    ],
  });
};

module.exports = movieLogger;
