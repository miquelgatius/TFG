const express = require("express");
const dotenv = require("dotenv");
const { connectDatabase } = require("./config/database");
//const User = require("./userModels");
const userRouter = require("./routes/user.Routes");
const billsRoutes = require("./routes/bills.Routes");

//start dotenv to get environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

//connecting mongodb
connectDatabase();

app.use(express.json());

//routes used on the server
app.use("/user", userRouter);
app.use("/bills", billsRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the TFG REST api");
});

/*
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
*/

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
/*const express = require("express");
const dotenv = require("dotenv");
const { connectDatabase } = require("./config/database");

//const cors = require("cors");

//creating the express root element
const app = express();

const PORT = process.env.PORT || 8080;


//const uri = "mongodb://localhost:27017/RealEstate";
//connecting mongodb
connectDatabase();

app.use(express.json());

dotenv.config();
app.get("/", (req, res) => {
  res.send("Welcome to Nodejs Authentication Tutorial");
});
//mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to MongoDB
mongoose
  .connect(uri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));


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
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
*/
