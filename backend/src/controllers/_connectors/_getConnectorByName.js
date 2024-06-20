const { Connector } = require("../../db");

const _getConnectorByName = async (name) => {
  const connector = await Connector.findOne({ where: { name } });

  if (!connector) {
    throw new Error("Connector not found");
  } else {
    return connector;
  }
};

module.exports = {
  _getConnectorByName,
};