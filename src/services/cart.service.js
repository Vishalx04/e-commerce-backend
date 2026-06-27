const prisma = require("../config/prisma");

const getCartService = async (req) => {
  const userId = req.user.id;

  const cart = await prisma.cart.findUnique({
    where: {
      userId,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!cart) {
    return {
      items: [],
      totalPrice: 0,
    };
  }

  let totalPrice = 0;

  for (const item of cart.items) {
    totalPrice += item.quantity * item.product.price;
  }

  return {
    items: cart.items,
    totalPrice,
  };
};

module.exports = {
  getCartService,
};