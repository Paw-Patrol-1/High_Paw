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
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  userId: [
    {
      type: String,
    },
  ],
});

const Hangout = mongoose.model("hangout", HangoutSchema);
module.exports = Hangout;
