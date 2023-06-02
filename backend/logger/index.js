const movieLogger = require("./movieLogger.js");

let logger = null;

if (process.env.NODE_ENV !== "movielog") {
  logger = movieLogger();
}

module.exports = logger;
