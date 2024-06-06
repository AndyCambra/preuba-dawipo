const { Service } = require("../db");

const _postService = async (name, apiKey) => {
  
  const findService = await Service.findOne({ where: { name: name }});

  if(findService){
    throw new Error("That service has already been created");
  }else {    
    return await Service.create({name, apiKey});    
  }
};

module.exports = {
  _postService,
};