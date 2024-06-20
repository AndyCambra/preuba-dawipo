const { _getConnectors } = require("../../controllers");

const getConnectors = async (req, res) => {  

  try {
    const allConnectors = await _getConnectors();

    res.status(201).json({
      message: "The connectors were obtained successfully",
      connectors: allConnectors,
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
  getConnectors,
};