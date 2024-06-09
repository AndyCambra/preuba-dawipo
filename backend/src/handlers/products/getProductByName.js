const { _getProductByName } = require("../../controllers");

const getProductByName = async (req, res) => {
  const { name } = req.params;
  
  try {
    const Product = await _getProductByName(name);
    if (!Product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(Product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching product", error: error.message });
  }
};

module.exports = { getProductByName };
