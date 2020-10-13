const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    phoneNumber: {
      type: String,
      require: true,
      unique: [true, "Phone Number is already exists."],
      required: [true, "Phone Number is required."],
    },
    username: {
      type: String,
      unique: [true, "Username is already exists."],
      required: [true, "Username is required."],
    },
    isVerifiedUser: {
      type: Boolean,
      default: false,
    },
    dob: {
      type: String
    },
    age: {
      type: Number
    },
    gender: {
      type: String
    },
    hash: {
      type: String,
    },
  },
  { timestamps: true },
  { minimize: false }
);


module.exports = mongoose.model("User", userSchema);
