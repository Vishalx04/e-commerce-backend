const {
  addCategoryService,
  deleteCategoryService,
  updateCategoryService,
} = require("../../services/adminServies/admin.category.service");

const addCategory = async (req, res) => {
  const category = await addCategoryService(req.body);
  // console.log(category);
  return res.status(200).json({
    message: "category created successfully",
    category,
  });
};

const deleteCategory = async (req, res) => {
  const result = await deleteCategoryService(Number(req.body.id));

  return res.status(200).json(result);
};

const updateCategory = async (req, res) => {
  const category = await updateCategoryService(req.body);

  return res.status(200).json({
    message: "category updated successfully",
    category,
  });
};

module.exports = {
  addCategory,
  deleteCategory,
  updateCategory,
};
