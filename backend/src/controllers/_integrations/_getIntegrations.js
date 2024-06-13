const { Integration } = require("../../db");

const _getIntegrations = async () => {  
  const allIntegrations = await Integration.findAll();

  if(allIntegrations.length === 0){
    throw new Error("There are no registered integrations yet");
  }else {    
    return allIntegrations;    
  }
};

module.exports = {
  _getIntegrations,
};