const express = require("express");
const { obtainFlatsByUser } = require("../controllers/flatController");
const router = express.Router();

router.get("/flatsByUser", obtainFlatsByUser);

module.exports = router;
