const { _deleteService } = require("../controllers/_deleteService");

const deleteService = async (req, res) => {
  const { name } = req.body;

  try {
    await _deleteService(name);

    res.status(200).json({
      message: "The service instance was deleted successfully",
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
  deleteService,
};