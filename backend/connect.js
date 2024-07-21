const mongoose = require("mongoose");

async function connectToMongoDB(url) {
  try {
    await mongoose.connect(url);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
}

module.exports = { connectToMongoDB };
