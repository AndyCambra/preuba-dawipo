const bcrypt = require("bcrypt");
const { User } = require("../../db");

const _postUser = async (
  name,
  lastName,
  email,
  password,
  avatarUrl           
  ) => {
  const findUser = await User.findOne({ where: { name } });
  
  if (findUser) {
    throw new Error(`${name} has already been created`);
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);

    return await User.create({
      name,
      lastName,
      email,
      password: hashedPassword,
      avatarUrl,
    });
  }
};

module.exports = {
  _postUser,
};
