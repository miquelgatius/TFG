const User = require("../userModels");

exports.obtainInvoicesByUserAndRegistry = async (req, res) => {
  try {
    const queryUsername = req.query.username;
    const queryRegistry = req.query.registry;
    console.log("Username: " + queryUsername + " Registry: " + queryRegistry);
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
    console.log("Username: " + queryUsername);
    const queryInvoice = req.body.invoices;

    const queryRegistry = req.body.registry;
    console.log("Registry: " + queryRegistry);
    const queryInvoiceID = req.body.invoices.invoiceID;
    console.log("InvoiceID: " + queryInvoiceID);
    // Check if the property exists exists
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

    const properties = await User.findOneAndUpdate(
      { username: queryUsername, "properties.registry": queryRegistry },
      { $push: { "properties.$.invoices": queryInvoice } },
      { new: false } // won't return the new updated data
    );
    console.log("here3");
    return res.status(200).json({ properties });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error adding a new invoice" });
  }
};

exports.updateInvoice = async (req, res) => {
  try {
    const queryUsername = req.body.username;
    const queryProperty = req.body.property;
    const queryRegistry = req.body.property.registry;

    console.log("query registry: " + queryRegistry);
    // Check if the property exists exists
    const existingProperty = await User.findOne({
      username: queryUsername,
      "properties.registry": Number(queryRegistry),
    });

    if (!existingProperty) {
      return res
        .status(400)
        .json({ message: "An invoice with this ID doesn't exists." });
    }

    const updatedProperty = await User.findOneAndUpdate(
      { username: queryUsername, "properties.registry": queryRegistry },
      {
        $set: {
          "properties.$.registry": queryProperty.registry,
          "properties.$.address": queryProperty.address,
          "properties.$.meters": queryProperty.meters,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      message: "An invoice has been updated succesfully." + updatedProperty,
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
    console.log("Username: " + queryUsername);
    console.log("Registry: " + queryRegistry);

    // Check if the property exists exists
    const existingProperty = await User.findOne({
      username: queryUsername,
      "properties.registry": Number(queryRegistry),
    });

    if (!existingProperty) {
      return res
        .status(400)
        .json({ message: "A property with this registry doesn't exist." });
    }

    const propertiesDeleted = await User.updateOne(
      { username: queryUsername },
      { $pull: { properties: { registry: parseInt(queryRegistry) } } }
    );

    if (propertiesDeleted.nModified === 0) {
      return res.status(404).send("Property not found or already deleted");
    }

    return res
      .status(200)
      .json({ message: "A property has been deleted succesfully." });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error adding a new property" });
  }
};
