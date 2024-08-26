const User = require("../userModels");

exports.obtainFlatsByUser = async (req, res) => {
  try {
    const flats = await User.find({}, { flat: 1, _id: 0 });
    return res.status(200).json({ flats });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error fetching flats" });
  }
};
