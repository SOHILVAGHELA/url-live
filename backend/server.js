const express = require("express");
const { connectToMongoDB } = require("./connect");
const UrlRoute = require("./routes/Url.route");
const cors = require("cors");
const dotenv = require("dotenv");
//env configure
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;
const MONGODB_URL = process.env.MONGO_URL;

app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectToMongoDB(MONGODB_URL);

// Define routes
app.use("/", UrlRoute);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
