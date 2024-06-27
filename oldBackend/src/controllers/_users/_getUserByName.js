const { User } = require("../../db");

const _getUserByName = async (name) => {
  const user = await User.findOne({ where: { name } });

  if (!user) {
    throw new Error("User not found");
  } else {
    return user;
  }
};

module.exports = {
  _getUserByName,
};
