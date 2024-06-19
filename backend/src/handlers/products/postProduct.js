const axios = require("axios");
const { _postProduct } = require("../../controllers");

const postProduct = async (req, res) => {
  const products = Array.isArray(req.body) ? req.body : [req.body];

  try {
    const newProducts = [];

    for (const product of products) {
      console.log("Product:", product); // Debugging line

      // Enviar los datos al modelo de IA para transformarlos
      const response = await axios.post(
        "http://localhost:5000/add_product",
        product
      );
      const transformedProduct = response.data;

      console.log("Transformed Product:", transformedProduct); // Debugging line

      // Crear un nuevo producto en la base de datos utilizando el producto transformado
      const newProduct = await _postProduct({
        name: transformedProduct.name,
        originCountry: transformedProduct.originCountry,
        finalCountry: transformedProduct.finalCountry,
        departureDate: transformedProduct.departureDate,
        arrivalDate: transformedProduct.arrivalDate,
        status: transformedProduct.status,
        provider: transformedProduct.provider,
        courier: transformedProduct.courier,
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
