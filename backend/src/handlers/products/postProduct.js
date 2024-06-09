const { _postProduct } = require("../../controllers");

const postProduct = async (req, res) => {
  const products = Array.isArray(req.body) ? req.body : [req.body];  

  try {
    const newProducts = [];

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
      
      const newProduct = await _postProduct(
        {
          name,
          originCountry, 
          finalCountry, 
          departureDate, 
          arrivalDate, 
          status, 
          provider, 
          courier 
        });      
      newProducts.push(newProduct);
    }

    res.status(201).json({
      message: "The products instances were created successfully",
      products: newProducts,
    });
  } catch (error) {
    res.status(400).json({
      error: true,
      message: error.message || "Unknown error",
    });
  }
};

module.exports = {
  postProduct,
};
