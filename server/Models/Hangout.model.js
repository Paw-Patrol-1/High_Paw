const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HangoutSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: Number,
      required: true,
    },
    userId: [{
        type: Schema.Types.ObjectId,
        ref: "user"
    }]
});


const Hangout = mongoose.model("hangout", HangoutSchema);
module.exports = Hangout;