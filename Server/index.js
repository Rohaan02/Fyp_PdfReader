const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcrypt");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const FilesPath = require("./models/FilesPath");

const app = express();
app.use(cors()); // Allow CORS for all origins
app.use(express.json()); // To parse JSON bodies
app.use("/auth/", require("./authRoutes"));
// MongoDB connection
mongoose.connect("mongodb://localhost:27017/pdf_data_extraction", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files to the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Rename file with timestamp
  },
});

const upload = multer({ storage });

// File upload route
app.post("/api/upload", upload.array("files"), async (req, res) => {
  try {
    const { userId, userType } = req.body; // Extract userId and userType

    if (!userId || !userType) {
      return res.status(400).json({
        success: false,
        message: "User ID and User Type are required",
      });
    }

    const filePaths = req.files.map((file) => file.path);

    const newFilesPath = new FilesPath({
      userId,
      userType,
      files: filePaths,
    });

    await newFilesPath.save();

    res.status(201).json({
      success: true,
      message: "Files uploaded successfully",
      data: newFilesPath,
    });
  } catch (error) {
    console.error("File upload error:", error);
    res
      .status(500)
      .json({ success: false, message: "File upload failed", error });
  }
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

app.get("/", (req, res) => {
  return res.json({
    message: "hahahahahaha",
  });
});

// Start the server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
