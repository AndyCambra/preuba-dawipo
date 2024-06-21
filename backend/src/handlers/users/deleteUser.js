const { _deleteUser } = require("../../controllers");

const deleteUser = async (req, res) => {
  const { name } = req.params;

  try {
    await _deleteUser(name);

    res.status(200).json({
      message: "The user was deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      error: true,
      message: error.message || "Unknown error",
    });
  }
};

module.exports = {
  deleteUser,
};
