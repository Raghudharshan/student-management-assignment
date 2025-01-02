const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const studentRoutes = require("./routes/studentRoutes");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/studentdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

// Routes
app.use("/api/students", studentRoutes);

// Start server
const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));