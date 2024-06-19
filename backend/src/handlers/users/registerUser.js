const { validationResult } = require('express-validator');
const { _registerUser } = require("../../controllers");

const registerUser = async (req, res) => {
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
    const newUser = await _registerUser(
      name,      
      lastName,
      email,
      password,
      avatarUrl      
    );      

    res.status(201).json({
      message: "The user was registered successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(400).json({
      error: true,
      message: error.message || "Unknown error",
    });
  }
};

module.exports = {
  registerUser,
};
