const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcrypt");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const FilesPath = require("./models/FilesPath");
const { exec } = require("child_process");
const ExtractedData = require("./models/ExtractedData"); // New Model for storing extracted data

const app = express();
app.use(cors());
app.use(express.json());
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
    const { userId, userType } = req.body;
    const filePaths = req.files.map((file) => file.path);

    const newFilesPath = new FilesPath({
      userId,
      userType,
      files: filePaths,
    });

    await newFilesPath.save();

    // Redirect user to ChatPage after file upload
    res.status(201).json({
      success: true,
      message: "Files uploaded successfully",
      redirectUrl: "/chat",
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

//Data Extraction
app.post("/api/extract-data", async (req, res) => {
  try {
    const { filePath } = req.body; // Path of the uploaded PDF file

    // Run the Python script to extract data
    exec(
      `python extract_pdf_data.py ${filePath}`,
      async (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing Python script: ${error}`);
          return res
            .status(500)
            .json({ success: false, message: "Extraction failed" });
        }

        // Parse the extracted data from stdout
        const extractedData = stdout.trim();

        // Save the extracted data in MongoDB
        const newExtractedData = new ExtractedData({
          filePath,
          extractedData,
        });

        await newExtractedData.save();

        res.status(200).json({
          success: true,
          message: "Data extracted and saved successfully",
          extractedData: newExtractedData,
        });
      }
    );
  } catch (error) {
    console.error("Extraction error:", error);
    res
      .status(500)
      .json({ success: false, message: "Data extraction failed", error });
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
