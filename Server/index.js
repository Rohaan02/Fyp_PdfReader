const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User"); // Import the User model
const FilesPath = require("./models/FilesPath"); // Import the FilesPath model
const Chat = require("./models/Chat"); // Import the Chat model
const SubChats = require("./models/SubChats"); // Import the SubChats model

const bcrypt = require("bcrypt");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const { exec } = require("child_process");

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
const fs = require("fs");

// Ensure the 'uploads' directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files to the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Rename file with timestamp
  },
});

const upload = multer({ storage });

module.exports = upload;


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

// Fetch file paths for the logged-in user
app.get("/api/get-file-paths", async (req, res) => {
  const { userId, userType } = req.query;

  try {
    // Find files for the specified userId and userType
    const files = await FilesPath.find({ userId, userType });

    // Check if there are any files
    if (files.length === 0) {
      return res.status(200).json({
        success: true,
        filePaths: [], // Return an empty array if no files are found
      });
    }

    // Get the last entry in the files array
    const lastEntryFiles = files[files.length - 1].files;

    // Ensure the file paths are only logged once
    // console.log("File paths:", lastEntryFiles);

    const extractedTextFromPDF = [];

    // Create a function to handle the Python process for each file path
    const extractTextFromPDF = (filePath) => {
      return new Promise((resolve, reject) => {
        const spawn = require("child_process").spawn;
        const pythonProcess = spawn("python3", [
          "./extract_pdf_data.py",
          filePath,
        ]);

        let extractText = ""; // Collect the output here

        pythonProcess.stdout.on("data", (data) => {
          extractText += data.toString(); // Append chunks to extractText
        });

        pythonProcess.stdout.on("end", () => {
          resolve(extractText); // Resolve when the entire output is received
        });

        pythonProcess.on("error", (error) => {
          reject(error); // Handle error cases
        });
      });
    };

    // Extract text from all PDF files asynchronously
    for (const filePath of lastEntryFiles) {
      const extractedText = await extractTextFromPDF(filePath);
      extractedTextFromPDF.push(extractedText);

      // Log the extracted text for each file once
      // console.log(`Extracted text for ${filePath}:`, extractedText);
    }

    // Send response after all PDF data is extracted
    res.status(200).json({
      success: true,
      filePaths: lastEntryFiles, // Return all file paths from the last entry
      extractedTextFromPDF, // Return the extracted text
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching file paths",
      error,
    });
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

// Create chat and save extracted text in the Chat model
app.post("/api/create-chat", async (req, res) => {
  try {
    const { userId, filenames, extractedText } = req.body;

    // Ensure that userId, filenames, and extractedText are provided
    if (!userId || !filenames || !extractedText) {
      return res.status(400).json({
        success: false,
        message: "Missing userId, filenames, or extractedText",
      });
    }

    // Create a new chat with the extractedText field
    const newChat = new Chat({
      userId,
      filenames,
      extractedText,  // Saving extracted text directly in chat
    });

    await newChat.save();

    res.status(201).json({
      success: true,
      message: "Chat created successfully",
      chatId: newChat._id,
    });
  } catch (error) {
    console.error("Error creating chat:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create chat",
      error,
    });
  }
});


// Update the chat name after the first user message
app.put("/api/update-chat/:chatId", async (req, res) => {
  try {
    const { chatId } = req.params;
    const { chatName, extractedText, userId } = req.body; // Make sure we get extractedText

    const chat = await Chat.findOne({ _id: chatId, userId });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found for this user",
      });
    }

    chat.chatName = chatName;
    chat.extractedText = extractedText;  // Update the extracted text if needed
    await chat.save();

    res.status(200).json({
      success: true,
      message: "Chat updated successfully",
      chat,
    });
  } catch (error) {
    console.error("Error updating chat:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update chat",
      error,
    });
  }
});


// Create a subchat (message) linked to a chat
app.post("/api/create-subchat", async (req, res) => {
  try {
    const { chatId, question, response, userId } = req.body;

    // Ensure that all required fields are provided
    if (!chatId || !question || !response || !userId) {
      return res.status(400).json({
        success: false,
        message: "Missing one or more required fields",
      });
    }

    // Ensure the chat belongs to the user
    const chat = await Chat.findOne({ _id: chatId, userId });
    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found for this user",
      });
    }

    const newSubChat = new SubChat({
      chatId,
      extractedText,
      messages: [{ question, response }],
    });

    await newSubChat.save();

    res.status(201).json({
      success: true,
      message: "SubChat created successfully",
      subChat: newSubChat,
    });
  } catch (error) {
    console.error("Error creating subchat:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create subchat",
      error,
    });
  }
});


// Fetch all chats for the logged-in user, including extracted text
app.get("/api/chats", async (req, res) => {
  const { userId } = req.query;

  try {
    const chats = await Chat.find({ userId });

    res.status(200).json({
      success: true,
      chats,  // Chats now include extractedText field
    });
  } catch (error) {
    console.error("Error fetching chats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch chats",
      error,
    });
  }
});


// Fetch all subchats for a specific chatId
app.get("/api/subchats/:chatId", async (req, res) => {
  const { chatId } = req.params;
  const { userId } = req.query; // Get userId from query

  try {
    // Ensure the chat belongs to the user
    const chat = await Chat.findOne({ _id: chatId, userId });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found for this user",
      });
    }

    const subChats = await SubChat.find({ chatId });

    res.status(200).json({
      success: true,
      subChats,
    });
  } catch (error) {
    console.error("Error fetching subchats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch subchats",
      error,
    });
  }
});



// Start the server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
