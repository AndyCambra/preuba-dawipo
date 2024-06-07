const { Service } = require("../../db");

const _putService = async (name, updateData) => {
  const findService = await Service.findOne({ where: { name } });

  if (!findService) {
    throw new Error("That service does not exist");
  } else {
    Object.assign(findService, updateData); // Update fields
    await findService.save();
    return findService;
  }
};

module.exports = {
  _putService,
};
