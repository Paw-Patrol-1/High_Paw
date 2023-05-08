const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET } = process.env;

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
    minlength: 8,
  },

  token: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  // latLong: {
  //   type: [Number],
  //   required: true,
  // },
  picture: {
    type: String,
    // required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

UserSchema.pre("save", async function (next) {
  let user = this;
  // hashes password
  try {
    if (user.isModified("password")) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);
      user.password = hashedPassword;
      user.confirmPassword = hashedPassword;
      next();
    }
  } catch (error) {
    next(error);
  }
});

// compares user input password to hashed password
UserSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

// generate token
UserSchema.methods.generateToken = async function () {
  try {
    let user = this;
    let token = jwt.sign(user._id.toHexString(), JWT_SECRET);

    user.token = token;
    user.save(function (err) {
      if (err) return err;
    });
  } catch (error) {
    throw error;
  }
};

// find and verify token
UserSchema.statics.findToken = async function (token, decode) {
  let user = this;

  try {
    jwt.verify(token, JWT_SECRET);
    user.findOne({ _id: decode, token: token });
  } catch (error) {
    throw error;
  }
};

// delete token
UserSchema.methods.deleteToken = async function () {
  let user = this;

  try {
    user.update({ $unset: { token: 1 } });
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model("user", UserSchema);
module.exports = User;
