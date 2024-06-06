const { _putService } = require("../controllers/_putService");

const putService = async (req, res) => {
  const { name, newApiKey } = req.params;

  try {
    const updatedService = await _putService(name, newApiKey);

    res.status(200).json({
      message: "The service instance was updated successfully",
      service: updatedService,
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
  putService,
};