const bcrypt = require("bcrypt");
const { User } = require("../../db");

const _putUser = async (name, updateData) => {  
  const findUser = await User.findOne({ where: { name } });
  const {     
    lastName,
    email,
    password,
    avatarUrl,                
  } = updateData;

  if (!findUser) {
    throw new Error("That user does not exist");
  } else {
    name !== null && (findUser.name = name);
    lastName !== null && (findUser.lastName = lastName);
    email !== null && (findUser.email = email);
    avatarUrl !== null && (findUser.avatarUrl = avatarUrl);
    
    if (password !== null) {
      const hashedPassword = await bcrypt.hash(password, 10);
      findUser.password = hashedPassword;
    } 
       
    await findUser.save();
    return findUser;
  }
};

module.exports = {
  _putUser,
};