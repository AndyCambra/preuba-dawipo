const { validationResult } = require('express-validator');
const { _loginUser } = require("../../controllers");

const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;     

  try {          
    const user = await _loginUser(email, password);

    res.status(200).json({
      message: "Login successful",
      user: user,
    });
  } catch (error) {
    res.status(400).json({
      error: true,
      message: error.message || "Unknown error",
    });
  }
};

module.exports = {
  loginUser,
};