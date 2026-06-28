const {
  getCartService,
  addToCartService,
  deleteFromCartService,
  updateCartService,
} = require("../services/cart.service");

const getCart = async (req, res) => {
  const result = await getCartService(req);

  return res.status(200).json({
    success: true,
    data: result,
  });
};

const addToCart = async (req, res) => {
  const result = await addToCartService(req);

  return res.status(200).json({
    success: true,
    data: result,
  });
};

const deleteFromCart = async (req, res) => {
  const result = await deleteFromCartService(req);

  return res.status(200).json({
    success: true,
    data: result,
  });
};

const updateCart = async (req, res) => {
  const result = await updateCartService(req);

  return res.status(200).json({
    success: true,
    data: result,
  });
};

module.exports = {
  getCart,
  addToCart,
  deleteFromCart,
  updateCart,
};
