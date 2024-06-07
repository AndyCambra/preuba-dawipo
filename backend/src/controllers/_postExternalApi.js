const { ExternalApi } = require("../db");

const _postExternalApi = async (name, apiUrl) => {
  const findExternalApi = await ExternalApi.findOne({ where: { name } });

  if (findExternalApi) {
    throw new Error("That External API has already been created");
  } else {
    return await ExternalApi.create({ name, apiUrl });
  }
};

module.exports = {
  _postExternalApi,
};
