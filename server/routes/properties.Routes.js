const express = require("express");
const {
  obtainPropertiesByUser,
  addNewProperty,
} = require("../controllers/propertiesController");
const router = express.Router();

router.get("/propertiesByUser", obtainPropertiesByUser);
router.patch("/addNewProperty", addNewProperty);
module.exports = router;
