const { Product } = require("../../db");

const _getProductByName = async (name) => {
  const product = await Product.findOne({ where: { name } });

  if (!product) {
    throw new Error("Product not found");
  } else {
    return product;
  }
};

module.exports = {
  _getProductByName,
};
