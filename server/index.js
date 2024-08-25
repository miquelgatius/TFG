const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

app.get("/", (req, res) => {
  const information = [
    {
      registry: 1237812387213,
      address: "123 Main St, Apt 101",
      meters: 120,
    },
    {
      registry: 66666666,
      address: "123 666666 St, Apt 666",
      meters: 120,
    },
  ];
  res.json(information);
});

app.listen(8080, () => {
  console.log("server listening on port 8080");
});
