// models/Chat.js

const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  pdfFileName: String,
  rawText: String,
  prompts: [{ question: String, answer: String }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Chat", chatSchema);
