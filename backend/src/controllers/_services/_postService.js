const { Service } = require("../../db");

const _postService = async (name, apiUrl, apiKey) => {  
  const findService = await Service.findOne({ where: { name: name } });

  if(findService){
    throw new Error(`${findService} service has already been created`);
  }else {    
    return await Service.create({name, apiUrl, apiKey});    
  }
};

module.exports = {
  _postService,
};