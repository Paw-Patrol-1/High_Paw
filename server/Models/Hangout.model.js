const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HangoutSchema = new Schema({
    city: {
      type: String,
      required: true,
    },
    address: {
      type: Number,
      required: true,
    },
    userID: [{
        type: Schema.Types.ObjectId,
        ref: "user"
    }]
});


const Hangout = mongoose.model("hangout", HangoutSchema);
module.exports = Hangout;