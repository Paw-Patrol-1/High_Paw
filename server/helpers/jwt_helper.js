const JWT = require("jsonwebtoken");
const createError = require("http-errors");
require("dotenv").config();
const UserToken = require("../Models/Token.model");
const db = require("mongoose");
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;
// const client = require("./init_redis");

const signAccessToken = (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {};
    const secret = `${ACCESS_TOKEN_SECRET}`;
    const options = {
      expiresIn: "5m",
      audience: userId,
    };
    JWT.sign(payload, secret, options, (err, token) => {
      if (err) {
        console.log(err.message);
        return reject(createError.InternalServerError());
      }
      resolve(token);
    });
  });
};

// middleware to protect routes
const verifyAccessToken = (req, res, next) => {
  if (!req.header("Authorization")) return next(createError.Unauthorized());
  const authHeader = req.header("Authorization");
  const splitToken = authHeader.split(" ");
  const token = splitToken[1];
  JWT.verify(token, ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      const message =
        err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
      return next(createError.Unauthorized(message));
    }
    req.payload = payload;
    next();
  });
};

const signRefreshToken = (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {};
    const secret = `${REFRESH_TOKEN_SECRET}`;
    const options = {
      expiresIn: "1y",
      audience: userId,
    };
    JWT.sign(payload, secret, options, async (err, token) => {
      if (err) {
        console.log(err.message);
        reject(createError.InternalServerError());
      }

      const existingToken = await UserToken.findOne({ userId });
      if (existingToken) await UserToken.deleteOne({ userId });

      const userToken = new UserToken({ userId, token });

      const saveToken = await userToken.save();
      if (err) {
        console.log(err.message);
        reject(createError.InternalServerError());
        return;
      }
      resolve(userToken);
    });
  });
};

const verifyRefreshToken = (refreshToken) => {
  return new Promise((resolve, reject) => {
    JWT.verify(refreshToken, REFRESH_TOKEN_SECRET, async (err, payload) => {
      if (err) return reject(createError.Unauthorized());
      const userId = payload.aud;
      const userToken = await UserToken.findOne({ userId });

      console.log(userToken);
      if (err) {
        console.log(err.message);
        reject(createError.InternalServerError());
        return;
      }
      if (refreshToken === userToken.token) return resolve(userId);
      reject(createError.Unauthorized());
    });
  });
};

// const generateTokens = async (user) => {
//     try {
//         const payload = { };

//         const accessToken = JWT.sign(
//             payload,
//             ACCESS_TOKEN_SECRET,
//             { expiresIn: "14m" }
//         );
//         const refreshToken = JWT.sign(
//             payload,
//             REFRESH_TOKEN_SECRET,
//             { expiresIn: "30d" }
//         );

//         const userToken = await UserToken.findOne({ userId: user._id });
//         if (userToken) await userToken.deleteOne();

//         await new UserToken({ userId: user._id, token: refreshToken }).save();
//         return Promise.resolve({ accessToken, refreshToken });
//     } catch (err) {
//         return Promise.reject(err);
//     }
// };

module.exports = {
  signAccessToken,
  verifyAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  //   generateTokens
};
