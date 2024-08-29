// routes/chat.js

const express = require("express");
const router = express.Router();
const Chat = require("../models/Chat");

// Route to create a new chat
router.post("/create", async (req, res) => {
  const { userId, pdfFileName, rawText, prompts } = req.body;

  try {
    const newChat = new Chat({ userId, pdfFileName, rawText, prompts });
    await newChat.save();
    res.json(newChat);
  } catch (error) {
    res.status(500).json({ error: "Failed to create chat" });
  }
});

// Additional routes for retrieving chats can be added here

module.exports = router;
