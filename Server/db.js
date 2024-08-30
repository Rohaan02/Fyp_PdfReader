const mongoose = require("mongoose");

// Connect to the MongoDB database
mongoose.connect("mongodb://localhost:27017/pdf_data_extraction", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// Error handling
db.on("error", console.error.bind(console, "connection error:"));

// Confirm connection
db.once("open", function () {
  console.log("Connected to MongoDB database 'pdf_data_extraction'");
});
