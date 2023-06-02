const express = require("express");
const { checkAdmin } = require("../../utils/auth-utility");
const {
  addNewBus,
  removeBus,
  getAllUpcomingBuses,
} = require("../controllers/bus");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.get("/", checkAdmin, getAllUpcomingBuses);

router.post("/", checkAdmin, upload.single("image"), addNewBus);

router.delete("/:busId", checkAdmin, removeBus);

module.exports = router;
