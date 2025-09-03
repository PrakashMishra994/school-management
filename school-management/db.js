// db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/school_management", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully!");
  } catch (err) {
    console.error("❌ Error connecting MongoDB:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
