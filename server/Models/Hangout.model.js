const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HangoutSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  latLong: {
    type: [Number],
    required: true,
  },
  joining: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  // userId: {
  //   type: Schema.Types.ObjectId,
  //   required: true,
  //   ref: "user",
  // },
});

const Hangout = mongoose.model("hangout", HangoutSchema);
module.exports = Hangout;
