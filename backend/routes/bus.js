const express = require("express");
const { getAvailableBuses, getBusById } = require("../controllers/bus");
const { checkLogin } = require("../utils/auth-utility");

const router = express.Router();

router.get("/:name/:city/:date", checkLogin, getAvailableBuses);

router.get("/:busId", checkLogin, getBusById);

module.exports = router;
