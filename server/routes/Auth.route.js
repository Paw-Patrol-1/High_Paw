const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/Auth.Controller");
const { verifyAccessToken } = require("../helpers/jwt_helper");

router.get("/", verifyAccessToken, async (req, res, next) => {
  console.log(req.header("Authorization"));
  res.status(200).send("Welcome to the login, register and logout APIs");
});

router.post("/register", AuthController.register);

router.post("/login", AuthController.login);

router.delete("/logout", AuthController.logout);

router.post("/refresh-token", AuthController.refreshToken);

module.exports = router;
