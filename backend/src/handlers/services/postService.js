const { _postService } = require("../../controllers");

const postService = async (req, res) => {
  const services = Array.isArray(req.body) ? req.body : [req.body]; // Ensure services is an array

  try {
    const newServices = [];

    for (const service of services) {
      const { name, apiUrl, apiKey } = service;
      const newService = await _postService(name, apiUrl, apiKey);
      newServices.push(newService);
    }

    res.status(201).json({
      message: "The service instances were created successfully",
      services: newServices,
    });
  } catch (error) {
    res.status(400).json({
      error: true,
      message: error.message || "Unknown error",
    });
  }
};

module.exports = {
  postService,
};
