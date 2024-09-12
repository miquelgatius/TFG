const User = require("../userModels");

exports.obtainInvoicesByUserAndRegistry = async (req, res) => {
  try {
    const queryUsername = req.query.username;
    const queryRegistry = req.query.registry;
    const invoicesQuery = await User.findOne(
      {
        username: queryUsername,
        properties: { $elemMatch: { registry: queryRegistry } },
      },
      {
        "properties.$": 1,
      }
    );
    const invoices = invoicesQuery.properties[0].invoices || [];
    console.log(invoices);
    return res.status(200).json({ invoices });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error fetching invoices." });
  }
};

exports.addNewInvoice = async (req, res) => {
  try {
    const queryUsername = req.body.username;
    const queryInvoice = req.body.newInvoice;
    const queryRegistry = req.body.registry;
    const queryInvoiceID = req.body.newInvoice.invoiceID;

    // Check if the invoice exists
    const existingInvoice = await User.findOne({
      username: queryUsername,
      properties: {
        $elemMatch: {
          registry: Number(queryRegistry),
          "invoices.invoiceID": Number(queryInvoiceID),
        },
      },
    });

    if (existingInvoice) {
      return res
        .status(400)
        .json({ message: "An invoice  with this ID Already Exists" });
    } else {
      console.log(" Invoice Doesn't Exists: " + existingInvoice);
    }
    const filter = {
      username: queryUsername,
      "properties.registry": queryRegistry,
    };

    const updateDocument = {
      $push: {
        "properties.$.invoices": queryInvoice,
      },
    };

    const properties = await User.updateOne(filter, updateDocument);

    return res.status(200).json({ properties });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error adding a new invoice" });
  }
};

exports.updateInvoice = async (req, res) => {
  try {
    const queryUsername = req.body.username;
    const queryRegistry = req.body.registry;
    const queryInvoice = req.body.invoice;
    const queryInvoiceID = req.body.invoice.invoiceID;
    console.log("Username: " + queryUsername);
    console.log("Registry: " + queryRegistry);
    console.log("InvoiceID: " + queryInvoiceID);
    console.log("InvoiceID: " + queryInvoice);
    console.log("query registry: " + queryRegistry);

    // Check if the invoice exists exists
    const existingInvoice = await User.findOne({
      username: queryUsername,
      "properties.registry": Number(queryRegistry),
      "properties.invoices.invoiceID": Number(queryInvoiceID),
    });

    if (!existingInvoice) {
      return res
        .status(400)
        .json({ message: "An invoice with this ID doesn't exist." });
    }

    const updatedInvoice = await User.findOneAndUpdate(
      {
        username: queryUsername,
        "properties.registry": queryRegistry,
        "properties.invoices.invoiceID": Number(queryInvoiceID),
      },
      {
        $set: {
          "properties.$[property].invoices.$[invoice].invoiceID":
            queryInvoice.invoiceID,
          "properties.$[property].invoices.$[invoice].invoiceDescription":
            queryInvoice.invoiceDescription,
          "properties.$[property].invoices.$[invoice].invoiceType":
            queryInvoice.invoiceType,
          "properties.$[property].invoices.$[invoice].invoiceDate":
            queryInvoice.invoiceDate,
          "properties.$[property].invoices.$[invoice].invoiceAmount":
            queryInvoice.invoiceAmount,
        },
      },
      {
        arrayFilters: [
          { "property.registry": queryRegistry },
          { "invoice.invoiceID": Number(queryInvoiceID) },
        ],
        new: true,
      }
    );

    return res.status(200).json({
      message: "An invoice has been updated succesfully." + updatedInvoice,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error updating invoice." });
  }
};

exports.deleteInvoice = async (req, res) => {
  try {
    const queryUsername = req.body.username;
    const queryRegistry = req.body.registry;
    const queryInvoiceID = req.body.invoiceID;

    // Check if the invoice exists
    const existingInvoice = await User.findOne({
      username: queryUsername,
      "properties.registry": Number(queryRegistry),
      "properties.invoices.invoiceID": Number(queryInvoiceID),
    });

    if (!existingInvoice) {
      return res
        .status(400)
        .json({ message: "An invoice with this ID doesn't exist." });
    }

    const invoicesDeleted = await User.updateOne(
      { username: queryUsername, "properties.registry": queryRegistry },
      {
        $pull: {
          "properties.$.invoices": {
            invoiceID: Number(queryInvoiceID),
          },
        },
      }
    );

    if (invoicesDeleted.nModified === 0) {
      return res
        .status(404)
        .send("Failed to delete, cannot be found or already deleted.");
    }

    return res
      .status(200)
      .json({ message: "An Invoice has been deleted succesfully." });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error deleting an invoice" });
  }
};
