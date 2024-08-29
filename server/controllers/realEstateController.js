const User = require("../userModels");

exports.obtainRealEstateByUser = async (req, res) => {
  try {
    const queryUsername = req.query.username;
    const flats = await User.find(
      { username: queryUsername },
      { flat: 1, _id: 0 }
    );
    return res.status(200).json({ flats });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error fetching flats" });
  }
};
