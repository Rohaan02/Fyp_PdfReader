const express = require("express");
const connectDB = require("./config/db"); // Ensure the MongoDB connection is correctly set up in this file
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", require("./routes/auth")); // Adjust route path if needed

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
