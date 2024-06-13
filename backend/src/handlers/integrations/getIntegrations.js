const { _getIntegrations } = require("../../controllers");

const getIntegrations = async (req, res) => {  

  try {
    const allIntegrations = await _getIntegrations();

    res.status(201).json({
      message: "The integrations were obtained successfully",
      integration: allIntegrations,
    });
  } 
  catch (error) {
    res.status(400).json({
      error: true,      
      message: error.message || 'Unknown error',
    });
  }
};

module.exports = { 
  getIntegrations,
};