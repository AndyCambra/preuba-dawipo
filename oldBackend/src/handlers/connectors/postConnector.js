const { _postConnector } = require("../../controllers");

const postConnector = async (req, res) => {
  const connectors = Array.isArray(req.body) ? req.body : [req.body];

  try {
    const newConnectors = [];

    for (const connector of connectors) {
      const { name, apiUrl, apiKey } = connector;
      const newConnector = await _postConnector(name, apiUrl, apiKey);
      newConnectors.push(newConnector);
    }

    res.status(201).json({
      message: "The connector instances were created successfully",
      connectors: newConnectors,
    });
  } catch (error) {
    res.status(400).json({
      error: true,
      message: error.message || "Unknown error",
    });
  }
};

module.exports = {
  postConnector,
};
