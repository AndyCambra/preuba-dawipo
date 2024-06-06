const { _deleteExternalApi } = require("../controllers/_deleteExternalApi");

const deleteExternalApi = async (req, res) => {
  const { name } = req.body; // Changed from req.params to req.body

  try {
    await _deleteExternalApi(name);
    res.status(200).json({ message: "External API deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: true, message: error.message });
  }
};

module.exports = { deleteExternalApi };
