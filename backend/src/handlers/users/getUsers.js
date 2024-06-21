const { _getUsers } = require("../../controllers");

const getUsers = async (req, res) => {
  try {
    const allUsers = await _getUsers();

    res.status(201).json({
      message: "The users have been obtained successfully",
      users: allUsers,
    });
  } catch (error) {
    res.status(400).json({
      error: true,
      message: error.message || "Unknown error",
    });
  }
};

module.exports = {
  getUsers,
};
