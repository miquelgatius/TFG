const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
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

module.exports = User;
