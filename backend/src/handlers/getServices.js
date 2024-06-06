const { _getServices } = require("../controllers/_getServices");

const getServices = async (req, res) => {  

  try {
    const allServices = await _getServices();

    res.status(201).json({
      message: "The services were obtained successfully",
      service: allServices,
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
  getServices,
};