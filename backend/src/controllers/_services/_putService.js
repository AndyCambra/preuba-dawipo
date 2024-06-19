const { Service } = require("../../db");

const _putService = async (name, updateData) => {  
  const findService = await Service.findOne({ where: { name } });
  const { apiUrl, apiKey } = updateData;

  if (!findService) {
    throw new Error("That service does not exist");
  } else {
    apiUrl !== null && (findService.apiUrl = apiUrl);
    apiKey !== null && (findService.apiKey = apiKey);

    await findService.save();
    return findService;
  }
};

module.exports = {
  _putService,
};