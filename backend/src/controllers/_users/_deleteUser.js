const { User } = require("../../db");

const _deleteUser = async (name) => {
  const findUser = await User.findOne({ where: { name: name } });

  if (!findUser) {
    throw new Error("That user does not exist");
  } else {
    await User.destroy({ where: { name: name } });
  }
};

module.exports = {
  _deleteUser,
};
