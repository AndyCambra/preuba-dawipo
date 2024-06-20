const { _deleteIntegration } = require("../../controllers");

const deleteIntegration = async (req, res) => {
  const { name } = req.params;  

  try {
    await _deleteIntegration(name);

    res.status(200).json({
      message: "The integration instance was deleted successfully",
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
  deleteIntegration,
};
