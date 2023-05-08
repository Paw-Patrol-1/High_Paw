const User = require("../Models/User.model");
const createError = require("http-errors");
const { profileSchema } = require(`../helpers/validation_schema`);
const {
  signAccessToken,
  verifyAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../helpers/jwt_helper");

module.exports = {
  profileDetails: async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      console.log("user", user);

      if (user) {
        res.send({
          email: user.email,
          name: user.name,
          breed: user.breed,
          age: user.age,
          picture: user.picture,
          city: user.city,
        });
      } else {
        res.status(404);
        throw new Error("Profile Details Not Found");
      }
    } catch (error) {
      if (error) next(error);
    }
  },
  editProfile: async (req, res, next) => {
    try {
      const result = await profileSchema.validateAsync(req.body);
      const user = await User.findById(req.params.id);

      if (result && user) {
        await User.updateMany(
          {
            name: user.name,
            breed: user.breed,
            age: user.age,
            picture: user.picture,
            city: user.city,
          },
          {
            $set: {
              name: result.name,
              breed: result.breed,
              age: result.age,
              picture: result.picture,
              city: result.city,
            },
          }
        );
        res.send({
          name: user.name,
          breed: user.breed,
          age: user.age,
          picture: user.picture,
          city: user.city,
        });
      } else {
        res.status(404);
        throw new Error("Error Updating Profile Details");
      }
    } catch (error) {
      console.log(error);
    }
  },
};
