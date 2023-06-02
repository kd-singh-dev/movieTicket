const express = require("express");
const { checkAdmin } = require("../../utils/auth-utility");
const { getStats } = require("../controllers/stats");

const router = express.Router();

router.get("/", checkAdmin, getStats);

module.exports = router;
