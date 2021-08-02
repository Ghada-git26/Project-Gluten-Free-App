// models/User.model.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: [true, "Username is required."] },
    email: { type: String, required: [true, "Email is required."] },
    password: { type: String, required: [true, "Password is required."] },
    isAdmin: Boolean,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
