//const { query } = require("express");
const User = require("../userModels");

exports.obtainPropertiesByUser = async (req, res) => {
  try {
    const queryUsername = req.query.username;
    const properties = await User.find(
      { username: queryUsername },
      { properties: 1, _id: 0 }
    );
    return res.status(200).json({ properties });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error fetching properties" });
  }
};

exports.addNewProperty = async (req, res) => {
  try {
    const queryUsername = req.body.username;
    const queryProperty = req.body.property;
    const queryRegistry = req.body.property.registry;

    console.log(req.body);

    // Check if the property exists exists
    const existingProperty = await User.findOne({
      username: queryUsername,
      "properties.registry": Number(queryRegistry),
    });

    if (existingProperty) {
      return res
        .status(400)
        .json({ message: "A property with this registry Already Exists" });
    }

    const properties = await User.findOneAndUpdate(
      { username: queryUsername },
      { $push: { properties: queryProperty } },
      { new: false } // won't return the new updated data
    );

    return res.status(200).json({ properties });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error adding a new property" });
  }
};

exports.updateProperty = async (req, res) => {
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
        .json({ message: "A property with this registry doesn't exists." });
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
      message: "A property has been updated succesfully." + updatedProperty,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error updating property" });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const queryUsername = req.body.username;
    const queryRegistry = req.body.registry;

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
    return res.status(500).json({ message: "Error deleting a property" });
  }
};
