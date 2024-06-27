const { Connector } = require("../../db");

const _getConnectors = async () => {
  const allConnectors = await Connector.findAll();

  if (allConnectors.length === 0) {
    throw new Error("There are no registered connectors yet");
  } else {
    return allConnectors;
  }
};

module.exports = {
  _getConnectors,
};
