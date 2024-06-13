const { _postIntegration } = require("../../controllers");

const postIntegration = async (req, res) => {
  const integrations = Array.isArray(req.body) ? req.body : [req.body];  

  try {
    const newIntegrations = [];

    for (const integration of integrations) {
      const { name, apiUrl, apiKey } = integration;
      const newIntegration = await _postIntegration(name, apiUrl, apiKey);
      newIntegrations.push(newIntegration);
    }

    res.status(201).json({
      message: "The integration instances were created successfully",
      integrations: newIntegrations,
    });
  } catch (error) {
    res.status(400).json({
      error: true,
      message: error.message || "Unknown error",
    });
  }
};

module.exports = {
  postIntegration,
};
