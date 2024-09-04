const express = require("express");
const GoogleUser = require("./models/GoogleUser");
const router = express.Router();

router.post("/google-login", async (req, res) => {
  try {
    const { credential } = req.body;

    const { sub, name, email, picture } = req.body;

    let user = await GoogleUser.findOne({ googleId: sub });

    if (!user) {
      user = new GoogleUser({
        googleId: sub,
        name,
        email,
        avatar: picture,
      });

      await user.save();
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).json({ message: "Google login failed." });
  }
});

module.exports = router;
