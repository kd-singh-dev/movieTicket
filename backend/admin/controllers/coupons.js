const Coupon = require("../../models/coupons");
const HttpError = require("../../utils/error");
const logger = require("../../logger/index.js");

const createNewCoupon = async (request, response) => {
  try {
    const { discountPercentage, validBefore, couponName } = request.body;

    const coupon = new Coupon({
      discountPercentage: discountPercentage,
      validBefore: validBefore,
      couponName: couponName,
    });

    await coupon.save();

    logger.info(`New coupon added successfully coupon ID is ${coupon._id} `);
    response
      .status(201)
      .json({ message: "Coupon created successfully", coupon: coupon });
  } catch (error) {
    logger.error(
      `An error occurred while creating the coupon, ERROR : ${error.message}`
    );
    response.status(error.code).json({
      message: "An error occurred while creating the coupon",
      error: error.message,
    });
  }
};

const deleteCoupon = async (request, response) => {
  try {
    const couponId = request.params.couponId;
    const coupon = await Coupon.findById(couponId);

    if (!coupon) throw new HttpError("No coupon found", 404);

    await coupon.remove();
    logger.info(`coupon deleted successfully ID was ${couponId} `);
    response.status(200).json({ message: "Coupon deleted successfully" });
  } catch (error) {
    logger.error(
      `An error occurred while deleting the coupon, ERROR : ${error.message}`
    );
    response.status(error.code).json({
      message: "An error occurred while deleting the coupon",
      error: error.message,
    });
  }
};

const getAllCoupons = async (request, response) => {
  try {
    const coupons = await Coupon.find({ validBefore: { $gt: Date.now() } });
    logger.info(`All coupons fetched successfully `);
    response.status(200).json({ message: "Coupons fetched", coupons: coupons });
  } catch (error) {
    logger.error(
      `An error occurred while fetching the coupons, ERROR : ${error.message}`
    );
    response.status(error.code).json({
      message: "An error occurred while fetching the coupons",
      error: error.message,
    });
  }
};

module.exports = { createNewCoupon, deleteCoupon, getAllCoupons };
