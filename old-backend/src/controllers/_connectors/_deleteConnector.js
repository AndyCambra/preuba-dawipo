const { Connector } = require("../../db");

const _deleteConnector = async (name) => {
  const findConnector = await Connector.findOne({ where: { name: name } });

  if (!findConnector) {
    throw new Error("That connector does not exist");
  } else {
    await Connector.destroy({ where: { name: name } });
  }
};

module.exports = {
  _deleteConnector,
};
