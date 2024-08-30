const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();
app.use(cors()); // Allow CORS for all origins
app.use(express.json()); // To parse JSON bodies

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/pdf_data_extraction", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Sign up route
app.post("/auth/form-signup", async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ email, password: hashedPassword, username });
    await newUser.save();

    res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
});

// // Login route
// app.post("/auth/form-login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if the user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid credentials" });
//     }

//     // Check if the password is correct
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid credentials" });
//     }

//     // If login is successful, return user data (or token)
//     res.status(200).json({ success: true, message: "Login successful", user });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server error", error });
//   }
// });

// Login route
app.post("/auth/form-login", async (req, res) => {
  try {
    const { identifier, password } = req.body;

    // Find the user by either email or username
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // If login is successful, return user data (or token)
    res.status(200).json({ success: true, message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
});

// Start the server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
