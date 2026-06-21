const {
  createProd,
  updateProd,
  deleteProd,
} = require("../../services/adminServies/adminProductService");

const createProduct = async (req, res) => {
 
    const product = await createProd(req.body);
    return res.status(201).json({
      message: "Product created successfully",
      product,
    });
 
};

const updateProduct = async (req, res) => {
  
    const product = await updateProd(req.body);

    return res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  
};

const deleteProduct = async (req, res) => {
 
     const result = await deleteProd(Number(req.body.id));

  return res.status(200).json(result);


};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
};
