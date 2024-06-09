const { Product } = require("../../db");

const _putProduct = async (name, updateData) => {  
  const findProduct = await Product.findOne({ where: { name } });
  const {     
    originCountry, 
    finalCountry, 
    departureDate, 
    arrivalDate, 
    status, 
    provider, 
    courier 
  } = updateData;

  if (!findProduct) {
    throw new Error("That Product does not exist");
  } else {
    name !== null && (findProduct.name = name);
    originCountry !== null && (findProduct.originCountry = originCountry);
    finalCountry !== null && (findProduct.finalCountry = finalCountry);
    departureDate !== null && (findProduct.departureDate = departureDate);
    arrivalDate !== null && (findProduct.arrivalDate = arrivalDate);
    status !== null && (findProduct.status = status);
    provider !== null && (findProduct.provider = provider);
    courier !== null && (findProduct.courier = courier);

    await findProduct.save();
    return findProduct;
  }
};

module.exports = {
  _putProduct,
};