const express = require("express");
const router = express.Router();

const { verifyAccessToken } = require("../helpers/jwt_helper");

const HangoutController = require("../controllers/Hangout.Controller");

router.get("/all", verifyAccessToken, HangoutController.allHangouts);

router.get("/:id", HangoutController.allHangouts);

router.post("/create", HangoutController.newHangout);

router.delete("/:id", HangoutController.deleteHangout);

module.exports = router;
