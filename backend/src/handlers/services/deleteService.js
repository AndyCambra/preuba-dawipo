const { _deleteService } = require("../../controllers");

const deleteService = async (req, res) => {
  const { name } = req.params;  

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
