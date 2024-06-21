const { _getConnectorByName } = require("../../controllers");

const getConnectorByName = async (req, res) => {
  const { name } = req.params;

  try {
    const connector = await _getConnectorByName(name);
    if (!connector) {
      return res.status(404).json({ message: "Connector not found" });
    }
    res.status(200).json(connector);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching connector", error: error.message });
  }
};

module.exports = { getConnectorByName };
