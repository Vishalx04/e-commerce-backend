const { getAllcategories } = require("../services/category.service")

const getCategories =async (req,res)=>{

    const categories = await getAllcategories();

    return res.status(200).json(categories);
  
}

module.exports = {
    getCategories
}