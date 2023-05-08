const express = require("express");
const router = express.Router();

const { verifyAccessToken } = require("../helpers/jwt_helper");

const HangoutController = require("../controllers/Hangout.Controller");

router.get("/all", verifyAccessToken, HangoutController.allHangouts);

router.get("/:id", HangoutController.allHangouts);

router.post("/create", HangoutController.newHangout);

// edit a hangout 
router.put("/edit")

// when hangout is cancelled or no lonfer needed in db
router.delete("/:id", HangoutController.deleteHangout);

module.exports = router;
