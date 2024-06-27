const { _deleteProduct } = require("../../controllers");

const deleteProduct = async (req, res) => {
  const { name } = req.params;

  try {
    await _deleteProduct(name);

    res.status(200).json({
      message: "The Product instance was deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      error: true,
      message: error.message || "Unknown error",
    });
  }
};

module.exports = {
  deleteProduct,
};
