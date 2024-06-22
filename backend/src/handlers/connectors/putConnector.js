const { _putConnector } = require("../../controllers");

const putConnector = async (req, res) => {
  const connectors = Array.isArray(req.body) ? req.body : [req.body];

  try {
    const updatedConnectors = [];

    for (const connector of connectors) {
      const { name, apiUrl, apiKey } = connector;
      const updatedConnector = await _putConnector(name, { apiUrl, apiKey });
      updatedConnectors.push(updatedConnector);
    }

    res.status(200).json({
      message: "The connector instance was updated successfully",
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
  putConnector,
};
