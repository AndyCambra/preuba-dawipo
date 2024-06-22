const axios = require("axios");

const handleEConnectorProducts = async (name, apiKey) => {
  try{
    console.log(`Getting the products from ${name} external connector...`)
    const _name = name.toLowerCase();

    const response = await axios.get(
      `http://localhost:3002/connectors/${_name}`,
      {
        headers: {
          [`${_name}-api-key`]: apiKey,
        },
      }
    );    

    //const products = await JSON.stringify(response.data.products);
    const products = response.data.products;    
    //console.log("Prodcuts " + JSON.stringify(response.data.products));
    
    console.log("Parsing data...")
    const response2 = await axios.post(
      "http://localhost:3001/products",
      products      
    );    
    
    console.log("Products handler response: " + JSON.stringify(response2.data.products));

  } catch (error) {
    console.log(`Error ${error.response.data.message}`);    
  }
};

module.exports = handleEConnectorProducts;