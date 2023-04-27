const cors = require("cors");
const express = require("express");
const app = express();
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config(".env");
require('./config/db')

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/user/register', async (req, res, next) => {

    res.send('User has registered account')
})

app.use((error, req, res, next) => {
    console.error("SERVER ERROR: ", error);
    if (res.statusCode < 400) res.status(500);
    res.send({ error: error.message, name: error.name, message: error.message });
});


// module.exports = { app };
const { PORT = 3000 } = process.env;


app.listen(PORT, () => {
  try {
    console.log(`Server is listening at http://localhost:${PORT}`);
  } catch (error) {
    console.error("Error starting server:", error);
  }
});