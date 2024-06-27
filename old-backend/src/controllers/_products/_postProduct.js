const { Product } = require("../../db");

const _postProduct = async (productData) => {
  const {
    name,
    originCountry,
    finalCountry,
    departureDate,
    arrivalDate,
    status,
    provider,
    courier,
  } = productData;

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
};

module.exports = {
  _postProduct,
};
