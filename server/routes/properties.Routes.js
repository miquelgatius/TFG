const express = require("express");
const {
  obtainPropertiesByUser,
  addNewProperty,
  deleteProperty,
  updateProperty,
} = require("../controllers/propertiesController");
const router = express.Router();

router.get("/propertiesByUser", obtainPropertiesByUser);
router.patch("/addNewProperty", addNewProperty);
router.put("/updateProperty", updateProperty);
router.patch("/deleteProperty", deleteProperty);

module.exports = router;
