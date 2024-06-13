const { Integration } = require("../../db");

const _postIntegration = async (name, apiUrl, apiKey) => {  
  const findIntegration = await Integration.findOne({ where: { name: name } });

  if(findIntegration){
    throw new Error(`${findIntegration} integration has already been created`);
  }else {    
    return await Integration.create({name, apiUrl, apiKey});    
  }
};

module.exports = {
  _postIntegration,
};