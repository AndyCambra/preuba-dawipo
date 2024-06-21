const { Connector } = require("../../db");

const _putConnector = async (name, updateData) => {  
  const findConnector = await Connector.findOne({ where: { name } });
  const { apiUrl, apiKey } = updateData;

  if (!findConnector) {
    throw new Error("That connector does not exist");
  } else {
    apiUrl !== null && (findConnector.apiUrl = apiUrl);
    apiKey !== null && (findConnector.apiKey = apiKey);

    await findConnector.save();
    return findConnector;
  }
};

module.exports = {
  _putConnector,
};