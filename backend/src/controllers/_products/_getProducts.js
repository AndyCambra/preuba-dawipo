const { Product } = require("../../db");

const _getProducts = async () => {
  const allProducts = await Product.findAll();

  if (allProducts.length === 0) {
    throw new Error("There are no registered products yet");
  } else {
    return allProducts;
  }
};

module.exports = {
  _getProducts,
};
