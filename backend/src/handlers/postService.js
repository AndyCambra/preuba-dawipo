const { _postService } = require("../controllers/_postService");

const postService = async (req, res) => {  
  const services = req.body; 

  try {
    const newServices = [];
    for (const service of services) {
      const { name, apiKey } = service;
      const newService = await _postService(name, apiKey);
      newServices.push(newService);
    }

    res.status(201).json({
      message: "The service instances were created successfully",
      services: newServices,
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
  postService,
};
