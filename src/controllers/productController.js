const { getAllProducts, getOneProduct } = require("../services/productService");

const getProducts = async (req, res) => {
  try {
    const result = await getAllProducts();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const result = await getOneProduct(id);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = { getProducts, getSingleProduct };
