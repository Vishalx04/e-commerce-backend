const prisma = require("../../config/prisma");

const createProd = async (productData) => {
  const { name, description, stock, price, imageUrl } = productData;
  const product = await prisma.product.create({
    data: {
      name,
      description,
      stock,
      price,
      imageUrl,
    },
  });

  return product;
};

const deleteProd = async (productId) => {
  const product = await prisma.product.delete({
    where: { id: productId },
  });

  return {
    message: "product deleted successfully",
  };
};

const updateProd = async (newProduct) => {
  const { id, name, description, stock, price, imageUrl } = newProduct;
  const product = await prisma.product.update({
    where: {
      id,
    },
    data: {
      name,
      description,
      stock,
      price,
      imageUrl,
    },
  });

  return product;
};

module.exports = {
  createProd,
  updateProd,
  deleteProd,
};
