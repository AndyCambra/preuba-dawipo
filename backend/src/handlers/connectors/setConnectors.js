const { _putConnector } = require("../../controllers");
const handleEConnectorProducts = require("../../helpers/handleEConnectorProducts");
const knownConnectors = require("../../helpers/knownConnectors");

const setConnectors = async (req, res) => {
  const connectors = Array.isArray(req.body) ? req.body : [req.body];

  try {
    const updatedConnectors = [];

    for (const connector of connectors) {
      const { name, apiUrl, apiKey } = connector;
      const updatedConnector = await _putConnector(name, { apiUrl, apiKey });
      if(knownConnectors.includes(name.toUpperCase())){
        await handleEConnectorProducts(name, apiKey);            
      }
      updatedConnectors.push(updatedConnector);
    }

    res.status(200).json({
      message: "The connector instances were set successfully",
      connectors: updatedConnectors,
    });
  } catch (error) {
    res.status(400).json({
      error: true,
      message: error.message || "Unknown error",
    });
  }
};

module.exports = {
  setConnectors,
};
