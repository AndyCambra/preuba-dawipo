const { ExternalApi } = require("../db");

const _getExternalApiByName = async (name) => {
  const externalApi = await ExternalApi.findOne({ where: { name } });
  if (!externalApi) {
    throw new Error("External API not found");
  } else {
    return externalApi;
  }
};

module.exports = {
  _getExternalApiByName,
};
