const prisma = require("../config/prisma");
const { NotFoundError, BadRequestError } = require("../errors");

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

  if(product.stock===0){
    throw new BadRequestError("Product is out of stock");
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
  if(cartItem && cartItem.quantity>=product.stock){
    throw new BadRequestError("Cannot add more items. Stock limit reached");
  }
  if (!cartItem ) {
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

const deleteFromCartService = async (req) => {
  const productId = Number(req.params.productId);
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!product) {
    throw new NotFoundError("Product not found");
  }

  const cart = await prisma.cart.findUnique({
    where: {
      userId: req.user.id,
    },
  });

  if (!cart) {
    throw new NotFoundError("Cart not found");
  }

  const cartItem = await prisma.cartItem.delete({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId,
      },
    },
  });

  return {
    message: "Product removed from cart successfully",
  };
};

const updateCartService = async (req) => {
  const productId = Number(req.params.productId);
  const quantity = req.body.quantity;

  if (quantity < 0) {
    throw new BadRequestError("Quantity must not be negative");
  }

  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    throw new NotFoundError("Product not found");
  }

  const cart = await prisma.cart.findUnique({
    where: {
      userId: req.user.id,
    },
  });

  if (!cart) {
    throw new NotFoundError("Cart not found");
  }

  if (quantity > product.stock) {
    throw new BadRequestError("Insufficient stock");
  }

  if (quantity === 0) {
    await prisma.cartItem.delete({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
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
        quantity,
      },
    });
  }

  return {
    message: "Product updated successfully",
  };
};

module.exports = {
  getCartService,
  addToCartService,
  deleteFromCartService,
  updateCartService,
};
