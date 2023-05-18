const User = require("../Models/User.model");
const createError = require("http-errors");
const { authSchema, loginSchema } = require(`../helpers/validation_schema`);
const {
  signAccessToken,
  verifyAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../helpers/jwt_helper");
const cloudinary = require("../config/cloudinary.js")

const client = require("../helpers/init_redis");

module.exports = {
  register: async (req, res, next) => {
    try {
      const result = await authSchema.validateAsync.cloudinary(req.body);
      console.log(result);
      

      const doesExist = await User.findOne({ email: result.email });
      if (doesExist)
        throw createError.Conflict(`${result.email} is already registered`);

      const user = new User(result);
      const savedUser = await user.save();
      const accessToken = await signAccessToken(savedUser.id);
      const refreshToken = await signRefreshToken(savedUser.id);
      res.send({ accessToken, refreshToken, user });
    } catch (error) {
      if (error.isJoi === true) res.status(422);
      next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const result = await loginSchema.validateAsync(req.body);
      const user = await User.findOne({ email: result.email });

      if (!user) throw createError.NotFound("User is not registered");

      const isMatch = await user.isValidPassword(result.password);

      if (!isMatch)
        throw createError.Unauthorized("Username or Password is not valid");

      const accessToken = await signAccessToken(user.id);
      const refreshToken = await signRefreshToken(user.id);

      res.send({ accessToken, refreshToken, user });
    } catch (error) {
      if (error.isJoi === true)
        return next(createError.BadRequest("Invalid username or Password"));
      next(error);
    }
  },
  logout: async (req, res, next) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) throw createError.BadRequest();
      const userId = await verifyRefreshToken(refreshToken);
      client.DEL(userId, (err, val) => {
        if (err) {
          console.log(err.message);
          throw createError.InternalServerError();
        }
        console.log(val);
        res.sendStatus(204);
      });
    } catch (error) {
      next(error);
    }
  },
  refreshToken: async (req, res, next) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) throw createError.BadRequest();

      const userId = await verifyRefreshToken(refreshToken);

      const accessToken = await signAccessToken(userId);
      const refToken = await signRefreshToken(userId);
      res.send({ accessToken: accessToken, refreshToken: refToken });
    } catch (error) {
      next(error);
    }
  },
};
