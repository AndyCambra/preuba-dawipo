const { Service } = require("../db");

const _deleteService = async (name) => {
  const findService = await Service.findOne({ where: { name: name }});

  if(!findService){
    throw new Error("That service does not exist");
  } else {
    await Service.destroy({ where: { name: name }});
  }
};

module.exports = {
  _deleteService,
};
