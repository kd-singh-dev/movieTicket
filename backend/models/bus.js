const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const movieSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    theater: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    imageKey: {
      type: String,
    },
    seats: [
      {
        seatNo: {
          type: Number,
          required: true,
        },
        isBooked: {
          type: Boolean,
          required: true,
        },
      },
    ],
    dateOfShow: {
      type: String,
      required: true,
    },
    timeOfShow: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Bus = mongoose.model("Bus", movieSchema);

module.exports = Bus;
