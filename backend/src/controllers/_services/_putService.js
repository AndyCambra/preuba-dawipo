const { Service } = require("../../db");

const _putService = async (name, newApiKey) => {
  const findService = await Service.findOne({ where: { name: name } });

  if(!findService){
    throw new Error("That service does not exist");
  } else {
    findService.apiKey = newApiKey;
    await findService.save();
    return findService;
  }
};

module.exports = {
  _putService,
};
