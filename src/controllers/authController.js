const { registerUser, userlogin } = require("../services/authService");

const register = async (req, res) => {
  try {
    const result = await registerUser(req.body);

    return res.json({
      result,
      message: "User registered successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const data = await userlogin(req.body);

    return res.json({
      message: "User logged in successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  register,
  login,
};
