const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const port = 8080;
const uri = "mongodb://localhost:27017/RealEstate";

app.use(cors());

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//connecting to the database control.
// Connect to MongoDB
mongoose
  .connect(uri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    flat: [
      {
        registry: Number,
        address: String,
        meters: Number,
        bills: [
          {
            billId: Number,
            billDescription: String,
            type: Number,
            amount: Number,
          },
        ],
      },
    ],
  },
  { collection: "RealEstate" }
);

const User = mongoose.model("User", userSchema);

// Define a route to get all users
app.get("/", async (req, res) => {
  try {
    const users = await User.find();
    console.log(users);
    res.json(users);
  } catch (err) {
    console.error("Error retrieving users:", err);
    res.status(500).send("Error retrieving users");
  }
});

app.get("/flats", async (req, res) => {
  try {
    // Find all documents but only return the 'flat' field
    const flats = await User.find({}, { flat: 1, _id: 0 });
    res.json(flats);
  } catch (err) {
    console.error("Error retrieving flats:", err);
    res.status(500).send("Error retrieving flats");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
