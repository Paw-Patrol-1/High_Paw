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
    attendees: [{
        type: Schema.Types.ObjectId,
        ref: "user"
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
});


const Dog = mongoose.model("dog", DogSchema);
module.exports = Dog;