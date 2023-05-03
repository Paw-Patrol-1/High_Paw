const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  age: { // Do we want to keep this
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  dogs: [{
    type: Schema.Types.ObjectId,
    ref: "dog"
  }]
});

UserSchema.pre("save", async function (next) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
      next();
    } catch (error) {
      next(error);
    }
});

UserSchema.methods.isValidPassword = async function (password) {
    try {
      return await bcrypt.compare(password, this.password);
    } catch (error) {
      throw error;
    }
};

const User = mongoose.model("user", UserSchema);
module.exports = User;