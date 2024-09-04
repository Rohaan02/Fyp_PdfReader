// Server/models/GoogleUser.js
const mongoose = require("mongoose");

const GoogleUserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
  },
});

const GoogleUser = mongoose.model("Google_Users", GoogleUserSchema);

module.exports = GoogleUser;
