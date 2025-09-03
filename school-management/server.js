// server.js
const express = require("express");
const connectDB = require("./db");

const app = express();

// MongoDB connect
connectDB();

app.get("/", (req, res) => {
  res.send("Hello, MongoDB connected with School Management!");
});

app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
