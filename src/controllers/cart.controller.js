const { getCartService } = require("../services/cart.service");

const getCart = async (req, res) => {
  const result = await getCartService(req);

  return res.status(200).json({
    success: true,
    data: result,
  });
};

module.exports = {
  getCart,
};