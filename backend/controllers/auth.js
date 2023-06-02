const User = require("../models/user");
const {
  generateHash,
  generateToken,
  verifyPassword,
} = require("../utils/auth-utility");
const HttpError = require("../utils/error");
const loggeer = require("../logger/index.js");
const logger = require("../logger/index.js");

const registerUser = async (request, response) => {
  try {
    let { name, email, phoneNumber, password, confirmPassword, roleId } =
      request.body;

    let user = await User.findOne({ email: email });

    if (user) {
      throw new HttpError(
        "An user with the given email already exists, please try registering with a different email address or login instead.",
        422
      );
    }

    if (password !== confirmPassword) {
      throw new HttpError("Entered passwords do not match", 422);
    }

    password = await generateHash(password);

    user = new User({
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
      roleId: roleId,
    });

    let token = generateToken(user._id.toString());

    await user.save();
    loggeer.info(user._id + "registerd successful");
    return response.status(201).json({
      message: "Registration successful.",
      user: user,
      token: token,
    });
  } catch (error) {
    loggeer.error(
      `An error occurred while registration, please try again. ERROR : ${error.message}`
    );
    return response
      .status(error.code)
      .json({ message: "An error occurred", error: error.message });
  }
};

const loginUser = async (request, response) => {
  try {
    const { email, password } = request.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      loggeer.info("No user found with the given email.");
      throw new HttpError("No user found with the given email.", 404);
    }

    let passwordMatchResult = await verifyPassword(password, user.password);

    if (!passwordMatchResult) {
      throw new HttpError("Invalid password", 422);
    }

    let token = generateToken(user._id);

    loggeer.info(user._id + "Successfully logged in");

    response
      .status(200)
      .json({ message: "Successfully logged in", token: token });
  } catch (error) {
    logger.error(
      `An error occurred while signing in, ERROR : ${error.message}`
    );
    response.status(error.code).json({
      message: "An error occurred while signing in.",
      error: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
