const { _postService } = require("../controllers/_postService");

const postService = async (req, res) => {
  const { name, apiKey } = req.body;

  try {
    const newService = await _postService(name, apiKey);

    res.status(201).json({
      message: "The service instance was created successfully",
      service: newService,
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