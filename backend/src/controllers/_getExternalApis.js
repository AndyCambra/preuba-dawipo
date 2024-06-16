const { ExternalApi } = require("../db");

const _getExternalApis = async () => {
  const allExternalApis = await ExternalApi.findAll();

  if (allExternalApis.length === 0) {
    throw new Error("There are no registered External APIs yet");
  } else {
    return allExternalApis;
  }
};

module.exports = {
  _getExternalApis,
};
