const axios = require("axios");
const formatData = require("./setData");

//HANDLE EXTERNAL CONNECTOR PRODUCTS
const handleECProducts = async (name, apiKey) => {
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
    
    const originalProductsStructure = response.data.products;    
    
    console.log("Preparing data to parse it...")    
    const setedProducts = formatData(originalProductsStructure);        
    
    console.log("Parsing data...")
    const response2 = await axios.post(
      "http://localhost:3001/products",
      setedProducts      
    );    
    
    console.log("Products handler response: " + JSON.stringify(response2.data.products));

  } catch (error) {
    console.log(`Error ${error.response.data.message}`);    
  }
};

module.exports = handleECProducts;

  // 'id': '00340434292135100186',
  // 'service': 'ecommerce',
  // 'origin_address_countryCode': 'US',
  // 'origin_address_postalCode': '41048',
  // 'origin_address_addressLocality': 'HEBRON',
  // 'destination_address_countryCode': 'US',
  // 'destination_address_postalCode': '89014',
  // 'destination_address_addressLocality': 'HENDERSON',
  // 'status_timestamp': '2023-05-08T10:37:00',
  // 'status_location_address_countryCode': 'US',
  // 'status.location.address_postalCode': '89014',
  // 'status_location_address_addressLocality': 'Henderson, NV, US',
  // 'status_statusCode': 'delivered',
  // 'status_status': 'DELIVERED',
  // 'status_description': 'DELIVERED - PARCEL LOCKER',
  // 'details_product_productName': 'DHL SM Parcel Plus Expedited',
  // 'details_weight_value': 1.352,
  // 'details_weight_unitText': 'LB',

