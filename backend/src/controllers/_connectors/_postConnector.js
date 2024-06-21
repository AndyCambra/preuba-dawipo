const { Connector } = require("../../db");

const _postConnector = async (name, apiUrl, apiKey) => {  
  const findConnector = await Connector.findOne({ where: { name: name } });

  if(findConnector){
    throw new Error(`${findConnector} connector has already been created`);
  }else {    
    return await Connector.create({name, apiUrl, apiKey});    
  }
};

module.exports = {
  _postConnector,
};