const { _deleteConnector } = require("../../controllers");

const deleteConnector = async (req, res) => {
  const { name } = req.params;  

  try {
    await _deleteConnector(name);

    res.status(200).json({
      message: "The connector was deleted successfully",
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
  deleteConnector,
};
