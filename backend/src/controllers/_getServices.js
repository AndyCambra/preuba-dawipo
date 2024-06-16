const { Service } = require("../db");

const _getServices = async () => {
  
  const allServices = await Service.findAll();

  if(allServices.length === 0){
    throw new Error("There are no registered services yet");
  }else {    
    return allServices;    
  }
};

module.exports = {
  _getServices,
};