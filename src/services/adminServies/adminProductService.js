const prisma = require("../../config/prisma");

const createProd = async (productData) => {
  try {
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
  } catch (error) {
    throw error;
  }
};

const deleteProd = async (productId) => {
  try {
    const product = await prisma.product.delete({
      where: { id: productId },
    });

    return {
      message: "product deleted successfully",
    };
  } catch (error) {
    throw error;
  }
};

const updateProd = async (newProduct) => {
  try {
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
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createProd,
  updateProd,
  deleteProd,
};
