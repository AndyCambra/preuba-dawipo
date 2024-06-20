const { Integration } = require("../../db");

const _putIntegration = async (name, updateData) => {  
  const findIntegration = await Integration.findOne({ where: { name } });
  const { apiUrl, apiKey } = updateData;

  if (!findIntegration) {
    throw new Error("That integration does not exist");
  } else {
    apiUrl !== null && (findIntegration.apiUrl = apiUrl);
    apiKey !== null && (findIntegration.apiKey = apiKey);

    await findIntegration.save();
    return findIntegration;
  }
};

module.exports = {
  _putIntegration,
};