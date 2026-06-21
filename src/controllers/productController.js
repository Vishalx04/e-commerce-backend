const { BadRequestError } = require("../errors");
const { getAllProducts, getOneProduct } = require("../services/productService");

const getProducts = async (req, res) => {
 
    const result = await getAllProducts();
    return res.status(200).json(result);

};

const getSingleProduct = async (req, res) => {
 
    const id = Number(req.params.id);

    if(!Number.isInteger(id)){
      throw new BadRequestError("Please enter a valid id");
    }

    const result = await getOneProduct(id);

    return res.status(200).json(result);

};

module.exports = { getProducts, getSingleProduct };
