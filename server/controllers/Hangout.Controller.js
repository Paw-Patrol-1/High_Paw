const Hangout = require("../Models/Hangout.model");
const createError = require("http-errors");
const { hangoutSchema } = require("../helpers/validation_schema");

module.exports = {
  newHangout: async (req, res, next) => {
    try {
      const result = await hangoutSchema.validateAsync(req.body);
      console.log(result);

      const doesExist = await Hangout.findOne({ title: result.title });
      //   if (doesExist)
      // throw createError.Conflict(`${result.title} is already taken`);

      //   const hangout = new Hangout(result);
      //   const savedHangout = await hangout.save();

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
  deleteHangout: async (req, res, next) => {
    try {
      const { id } = req.params;
      console.log(id);
      const hangout = await Hangout.findById(id);
      console.log(hangout);

      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  },
};
