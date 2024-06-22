const { _getDHLproducts } = require("../controllers/_getDHLproducts");

const getDHLproducts = async (req, res) => {
  try {
    const allProducts = await _getDHLproducts();

    res.status(201).json({
      message: "The Products were obtained successfully",
      products: allProducts,
    });
  } catch (error) {
    res.status(400).json({
      error: true,
      message: error.message || "Unknown error",
    });
  }
};

module.exports = {
  getDHLproducts,
};
