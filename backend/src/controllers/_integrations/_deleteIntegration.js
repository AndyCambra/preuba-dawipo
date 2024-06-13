const { Integration } = require("../../db");

const _deleteIntegration = async (name) => {
  const findIntegration = await Integration.findOne({ where: { name: name } });

  if(!findIntegration){
    throw new Error("That integration does not exist");
  } else {
    await Integration.destroy({ where: { name: name }});
  }
};

module.exports = {
  _deleteIntegration,
};
