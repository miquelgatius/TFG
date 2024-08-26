const express = require("express");
const { obtainFlatsByUser } = require("../controllers/flatController");
const router = express.Router();

router.get("/flats", obtainFlatsByUser);

module.exports = router;
