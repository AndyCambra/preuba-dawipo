const { validationResult } = require('express-validator');
const { _putUser } = require("../../controllers");

const putUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { 
    name,
    lastName,
    email,
    password,
    avatarUrl,   
  } = req.body;     

  try {          
    const updatedUser = await _putUser(
      name,
      {
        lastName,
        email,
        password,
        avatarUrl,            
      }
    );      

    res.status(200).json({
      message: "The user was updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(400).json({
      error: true,
      message: error.message || "Unknown error",
    });
  }  
};

module.exports = {
  putUser,
};