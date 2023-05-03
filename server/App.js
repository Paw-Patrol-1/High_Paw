const cors = require("cors");
const express = require("express");
const app = express();
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config(".env");
require('./config/db.config');
const cookieParser=require('cookie-parser');

const AuthRoute = require("./routes/Auth.route");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/auth", AuthRoute);

app.use((error, req, res, next) => {
    console.error("SERVER ERROR: ", error);
    if (res.statusCode < 400) res.status(500);
    res.send({ error: error.message, name: error.name, message: error.message });
});

module.exports = { app }