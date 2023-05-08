const Hangout = require("../Models/Hangout.model");
const createError = require("http-errors");
const { hangoutSchema } = require("../helpers/validation_schema");
const { all } = require("../routes/Auth.route");

module.exports = {
  newHangout: async (req, res, next) => {
    try {
      const result = await hangoutSchema.validateAsync(req.body);

      const doesExist = await Hangout.findOne({ title: result.title });
      if (doesExist)
        throw createError.Conflict(`${result.title} is already taken`);

      const hangout = new Hangout(result);
      const savedHangout = await hangout.save();

      const hangouts = await Hangout.find();

      res.send({ hangouts });
    } catch (error) {
      next(error);
    }
  },
  allHangouts: async (req, res, next) => {
    try {
      const hangouts = await Hangout.find();

      res.send({ hangouts });
    } catch (error) {
      next(error);
    }
  },
  singleHangout: async (req, res, next) => {
    try {
      const { id } = req.params;
      const hangout = await Hangout.findById(id);

      if (!hangout) {
        throw createError.Conflict("Hangout id is incorrect or does not exist");
      }

      res.send({ hangout });
    } catch (error) {
      next(error);
    }
  },
  deleteHangout: async (req, res, next) => {
    try {
      const { id } = req.params;

      const hangout = await Hangout.findById(id);
      if (!hangout) {
        throw createError.Conflict("Hangout id is incorrect or does not exist");
      }

      await Hangout.deleteOne({ _id: id });

      res.status(200).send({ message: "Hangout was deleted" });
    } catch (error) {
      next(error);
    }
  },
};
