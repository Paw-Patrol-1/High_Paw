const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DogSchema = new Schema({
    breed: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
    dogOwner: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
});


const Dog = mongoose.model("dog", DogSchema);
module.exports = Dog;