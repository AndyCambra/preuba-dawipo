const { User } = require("../../db");

const _getUsers = async () => {  
  const allUsers = await User.findAll();

  if(allUsers.length === 0){
    throw new Error("There are no registered users yet");
  }else {    
    return allUsers;    
  }
};

module.exports = {
  _getUsers,
};