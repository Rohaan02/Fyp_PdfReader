const mongoose = require("mongoose");

const filesPathSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "userType", // Dynamic reference based on user type
    required: true,
  },
  userType: {
    type: String,
    required: true,
    enum: ["User", "Google_Users"], // Refers to either User or GoogleUser model
  },
  files: [
    {
      type: String,
      required: true,
    },
  ],
  uploadDate: {
    type: Date,
    default: Date.now,
  },
});

const FilesPath = mongoose.model("FilesPath", filesPathSchema);

module.exports = FilesPath;
