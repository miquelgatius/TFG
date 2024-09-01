const express = require("express");
const {
  obtainPropertiesByUser,
  addNewProperty,
  deleteProperty,
} = require("../controllers/propertiesController");
const router = express.Router();

router.get("/propertiesByUser", obtainPropertiesByUser);
router.patch("/addNewProperty", addNewProperty);
router.patch("/deleteProperty", deleteProperty);
module.exports = router;
