const Coupon = require("../models/coupons");
const logger = require("../logger/index.js");

const getAllValidCoupons = async (request, response) => {
  try {
    const coupons = await Coupon.find({
      validBefore: {
        $gt: Date.now(),
      },
    });
    logger.info(`cupons fetched successfully`);
    response
      .status(200)
      .json({ message: "Coupons fetched successfully", coupons: coupons });
  } catch (error) {
    logger.error(
      `An error occurred while getting the coupons, ERROR : ${error.message}`
    );
    response.status(error.code).json({
      message: "An error occurred while getting the coupons",
      error: error.message,
    });
  }
};

module.exports = { getAllValidCoupons };
