// Package Imports
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const logger = require("./logger/index.js");

// Route Imports
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const busRoutes = require("./routes/bus");
const bookingRoutes = require("./routes/bookings");
const couponRoutes = require("./routes/coupons");
const razorpayRoutes = require("./routes/razorpay");

// Admin Route Imports
const adminBookingRoutes = require("./admin/routes/bookings");
const adminBusRoutes = require("./admin/routes/bus");
const adminCouponRoutes = require("./admin/routes/coupons");
const adminStatsRoutes = require("./admin/routes/stats");

const { connectDB } = require("./db/index");

const { getFileStream } = require("./utils/s3.js");

const app = express();
dotenv.config();

// Third party middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

app.get("/images/:key", (req, res) => {
  const key = req.params.key;
  const readStream = getFileStream(key);
  readStream.pipe(res);
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/bus", busRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/user", userRoutes);
app.use("/api/razorpay", razorpayRoutes);

// Admin Routes
app.use("/api/admin/bookings", adminBookingRoutes);
app.use("/api/admin/bus", adminBusRoutes);
app.use("/api/admin/coupons", adminCouponRoutes);
app.use("/api/admin/stats", adminStatsRoutes);

connectDB(() => {
  app.listen(process.env.PORT || 3000, () => {
    logger.info(
      `The server is up and running on port ${process.env.PORT || 3000}`
    );
  });
});
