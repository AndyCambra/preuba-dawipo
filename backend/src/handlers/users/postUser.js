const { validationResult } = require('express-validator');
const { _postUser } = require("../../controllers");

const postUser = async (req, res) => {
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
    const newUser = await _postUser(
      name,      
      lastName,
      email,
      password,
      avatarUrl      
    );      

    res.status(201).json({
      message: "The user was created successfully",
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
  postUser,
};
