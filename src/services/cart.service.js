const prisma = require("../config/prisma");
const { NotFoundError } = require("../errors");

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

const addToCartService = async (req) => {
  const userId = req.user.id;
  const productId = Number(req.params.productId);

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    throw new NotFoundError("Product not found");
  }

  let cart = await prisma.cart.findUnique({
    where: {
      userId,
    },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        userId,
      },
    });
  }

  let cartItem = await prisma.cartItem.findUnique({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId,
      },
    },
  });

  if (!cartItem) {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
      },
    });
  } else {
    await prisma.cartItem.update({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
      data: {
        quantity: cartItem.quantity + 1,
      },
    });
  }

  return {
    message: "Product added to cart successfully",
  };
};



module.exports = {
  getCartService,
  addToCartService,
};
