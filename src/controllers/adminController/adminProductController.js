const {
  createProd,
  updateProd,
  deleteProd,
} = require("../../services/adminServies/adminProductService");

const createProduct = async (req, res) => {
  try {
    const product = await createProd(req.body);
    return res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await updateProd(req.body);

    return res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
 try {
     const result = await deleteProd(Number(req.body.id));

  return res.status(200).json(result);
 } catch (error) {
    return res.status(500).json({
        error : error.message
    })
 }

};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
};
