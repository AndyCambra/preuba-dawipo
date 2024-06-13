const { _getUserByName } = require("../../controllers");

const getUserByName = async (req, res) => {
  const { name } = req.params;
  
  try {
    const User = await _getUserByName(name);
    if (!User) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(User);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching User", error: error.message });
  }
};

module.exports = { getUserByName };
