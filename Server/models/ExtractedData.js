const mongoose = require("mongoose");

const extractedDataSchema = new mongoose.Schema({
  filePath: {
    type: String,
    required: true,
  },
  extractedData: {
    type: String, // Store extracted text data here
    required: true,
  },
  extractedAt: {
    type: Date,
    default: Date.now,
  },
});

const ExtractedData = mongoose.model("ExtractedData", extractedDataSchema);

module.exports = ExtractedData;
