const express = require("express");
const {
  obtainPropertiesByUser,
} = require("../controllers/propertiesController");
const router = express.Router();

router.get("/propertiesByUser", obtainPropertiesByUser);

module.exports = router;
