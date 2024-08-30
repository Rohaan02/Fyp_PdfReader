const express = require("express");
const router = express.Router();
const { handleGoogleLogin, handleFormLogin } = require("./authController");

router.post("/google-login", async (req, res) => {
  try {
    const user = await handleGoogleLogin(req.body);
    res.status(200).json(user);
  } catch (error) {
    console.error("Google login error:", error.message);
    res.status(500).send("Google login failed");
  }
});

router.post("/form-login", async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;
    const user = await handleFormLogin(usernameOrEmail, password);
    res.status(200).json(user);
  } catch (error) {
    console.error("Form login/signup error:", error.message);
    res.status(500).send("Form login/signup failed");
  }
});

module.exports = router;
