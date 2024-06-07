const { _putService } = require("../../controllers");

const putService = async (req, res) => {
  const { name } = req.params; // Extract name from URL params
  const { apiUrl, apiKey } = req.body; // Extract fields from request body

  try {
    const updatedService = await _putService(name, { apiUrl, apiKey });

    res.status(200).json({
      message: "The service instance was updated successfully",
      service: updatedService,
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
