const { _getProducts } = require("../../controllers");

const getProducts = async (req, res) => {  

  try {
    const allProducts = await _getProducts();

    res.status(201).json({
      message: "The Products were obtained successfully",
      products: allProducts,
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
  getProducts,
};