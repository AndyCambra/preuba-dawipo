const { ExternalApi } = require("../db");

const _deleteExternalApi = async (name) => {
  const externalApi = await ExternalApi.findOne({ where: { name } });
  if (!externalApi) {
    throw new Error("External API not found");
  }
  await ExternalApi.destroy({ where: { name } });
};

module.exports = { _deleteExternalApi };
