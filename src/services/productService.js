const prisma = require("../config/prisma");
const { NotFoundError } = require("../errors");

const getAllProducts = async (queries) => {
    var {categoryId} = queries;
    categoryId = Number(categoryId);
    const products = await prisma.product.findMany({
      where :categoryId ? {categoryId} : {},
      
    });
    // console.log(products);
    return products;
 
};

const getOneProduct = async (productId) => {
 
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if(!product){
      throw new NotFoundError("No product with the product id");
    }

    return product;
 
};
module.exports = {
  getAllProducts,
  getOneProduct,
};
