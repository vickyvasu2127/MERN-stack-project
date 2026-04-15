const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  bloodGroup: String,
  role: {
    type: String,
    enum: ["donor", "admin"],
    default: "donor",
  },
  resetToken: String,
  resetTokenExpiry: Date,
  role:{
    type: String,
    enum: ["user", "admin"],
    default: "user",
  }
});

module.exports = mongoose.model("User", userSchema);