const { Integration } = require("../../db");

const _getIntegrationByName = async (name) => {
  const integration = await Integration.findOne({ where: { name } });

  if (!integration) {
    throw new Error("Integration not found");
  } else {
    return integration;
  }
};

module.exports = {
  _getIntegrationByName,
};