const { _putIntegration } = require("../../controllers");

const putIntegration = async (req, res) => {
  const integrations = Array.isArray(req.body) ? req.body : [req.body];   

  try {
    const updatedIntegrations = [];

    for (const integration of integrations) {
      const { name, apiUrl, apiKey } = integration;      
      const updatedIntegration = await _putIntegration(name, { apiUrl, apiKey });
      updatedIntegrations.push(updatedIntegration);
    }   

    res.status(200).json({
      message: "The integration instance was updated successfully",
      integrations: updatedIntegrations,
    });
  } catch (error) {
    res.status(400).json({
      error: true,
      message: error.message || "Unknown error",
    });
  }  
};

module.exports = {
  putIntegration,
};
