const express = require("express");
const router = express.Router();
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post("/google-login", async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { sub, email, name, picture } = ticket.getPayload();

    let user = await User.findOne({ googleId: sub });

    if (!user) {
      user = new User({
        googleId: sub,
        name,
        email,
        profilePic: picture,
      });
      await user.save();
    }

    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token: jwtToken, user });
  } catch (error) {
    res.status(400).json({ error: "Invalid Token" });
  }
});

module.exports = router;
