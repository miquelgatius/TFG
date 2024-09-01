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
    return res.status(500).json({ message: "Error fetching flats" });
  }
};
