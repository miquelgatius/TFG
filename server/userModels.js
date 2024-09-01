const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    properties: [
      {
        registry: Number,
        address: String,
        meters: Number,
        invoices: [
          {
            invoiceId: Number,
            invoiceDescription: String,
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
