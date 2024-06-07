const { Service } = require("../../db");

const _getServiceByName = async (name) => {
  const service = await Service.findOne({ where: { name } });

  if (!service) {
    throw new Error("Service not found");
  } else {
    return service;
  }
};

module.exports = {
  _getServiceByName,
};