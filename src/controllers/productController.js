const prisma = require("../config/prisma");
const { getAllProducts, getOneProduct } = require("../services/productService");

const getProducts = async (req, res) => {
  try {
    const result = await getAllProducts();
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const result = await getOneProduct(id);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { getProducts, getSingleProduct };
