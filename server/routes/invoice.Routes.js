const express = require("express");
const {
  obtainRealEstateByUser,
} = require("../controllers/realEstateController");
const router = express.Router();

router.get("/RealEstateByUser", obtainRealEstateByUser);

module.exports = router;
