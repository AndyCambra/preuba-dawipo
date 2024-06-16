const axios = require("axios");
const { Product } = require("../../db");

const _postProduct = async (productData) => {
  try {
    console.log("Product Data:", productData); // Debugging line
    // Call Flask app to format product data
    const response = await axios.post(
      "http://localhost:5000/add_product",
      productData
    );
    const formattedData = response.data;

    // Log the formatted data
    console.log("Formatted Data:", formattedData);

    const {
      name,
      originCountry,
      finalCountry,
      departureDate,
      arrivalDate,
      status,
      provider,
      courier,
    } = formattedData;

    const findProduct = await Product.findOne({ where: { name: name } });

    if (findProduct) {
      throw new Error(`${name} has already been created`);
    } else {
      return await Product.create({
        name,
        originCountry,
        finalCountry,
        departureDate,
        arrivalDate,
        status,
        provider,
        courier,
      });
    }
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

module.exports = {
  _postProduct,
};
