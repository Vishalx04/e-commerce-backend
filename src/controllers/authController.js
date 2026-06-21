const { registerUser, userlogin } = require("../services/authService");

const register = async (req, res) => {
  const result = await registerUser(req.body);

  return res.json({
    result,
    message: "User registered successfully",
  });
};

const login = async (req, res) => {
  const data = await userlogin(req.body);

  return res.json({
    message: "User logged in successfully",
    data,
  });
};

module.exports = {
  register,
  login,
};
