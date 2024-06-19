const { _putService } = require("../../controllers");

const putService = async (req, res) => {
  const services = Array.isArray(req.body) ? req.body : [req.body];   

  try {
    const updatedServices = [];

    for (const service of services) {
      const { name, apiUrl, apiKey } = service;      
      const updatedService = await _putService(name, { apiUrl, apiKey });
      updatedServices.push(updatedService);
    }   

    res.status(200).json({
      message: "The service instance was updated successfully",
      services: updatedServices,
    });
  } catch (error) {
    res.status(400).json({
      error: true,
      message: error.message || "Unknown error",
    });
  }  
};

module.exports = {
  putService,
};
