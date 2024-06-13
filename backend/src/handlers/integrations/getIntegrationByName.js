const { _getIntegrationByName } = require("../../controllers");

const getIntegrationByName = async (req, res) => {
  const { name } = req.params;
  
  try {
    const integration = await _getIntegrationByName(name);
    if (!integration) {
      return res.status(404).json({ message: "integration not found" });
    }
    res.status(200).json(integration);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching integration", error: error.message });
  }
};

module.exports = { getIntegrationByName };
