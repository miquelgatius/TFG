const express = require("express");
const dotenv = require("dotenv");
const { connectDatabase } = require("./config/database");
//const User = require("./userModels");
const cors = require("cors");
const userRouter = require("./routes/user.Routes");
const propertiesRoutes = require("./routes/properties.Routes");
const invoicesRoutes = require("./routes/invoices.Routes");

//start dotenv to get environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

//connecting mongodb
connectDatabase();

app.use(cors());
app.use(express.json());

//routes used on the server
app.use("/user", userRouter);
app.use("/properties", propertiesRoutes);
app.use("/invoices", invoicesRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the TFG REST api");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
