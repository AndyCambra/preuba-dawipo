const { _putProduct } = require("../../controllers");

const putProduct = async (req, res) => {
  const products = Array.isArray(req.body) ? req.body : [req.body];   

  try {
    const updatedProducts = [];

    for (const product of products) {
      const { 
        name, 
        originCountry, 
        finalCountry, 
        departureDate, 
        arrivalDate, 
        status, 
        provider, 
        courier 
      } = product;   
      
      const updatedProduct = await _putProduct(
        name,
        {
          originCountry, 
          finalCountry, 
          departureDate, 
          arrivalDate, 
          status, 
          provider, 
          courier 
        });
      updatedProducts.push(updatedProduct);
    }   

    res.status(200).json({
      message: "The product instance was updated successfully",
      products: updatedProducts,
    });
  } catch (error) {
    res.status(400).json({
      error: true,
      message: error.message || "Unknown error",
    });
  }  
};

module.exports = {
  putProduct,
};
