const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false, // Password is not required for Google users
  },
  googleId: {
    type: String,
    required: false, // Google ID is not required for form users
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
