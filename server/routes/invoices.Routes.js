const express = require("express");
const {
  obtainInvoicesByUserAndRegistry,
  addNewInvoice,
  deleteInvoice,
  updateInvoice,
} = require("../controllers/invoicesController");
const router = express.Router();

router.get("/invoicesByUserAndRegistry", obtainInvoicesByUserAndRegistry);
router.patch("/addNewInvoice", addNewInvoice);
router.put("/updateInvoice", updateInvoice);
router.patch("/deleteInvoice", deleteInvoice);

module.exports = router;
