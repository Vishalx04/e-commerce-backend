const prisma = require("../config/prisma");

const getAllProducts = async () => {
  try {
    const products = await prisma.product.findMany();
    // console.log(products);
    return products;
  } catch (error) {
    throw error;
  }
};

const getOneProduct = async (productId) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    return product;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  getAllProducts,
  getOneProduct,
};
