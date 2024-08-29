const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.googleLogin = async (req, res) => {
  const { token } = req.body;
  // Verify token using Google API
  // Extract user data
  // Check if user exists in DB; if not, create new user
  // Respond with JWT token
};
