const { addCategory, deleteCategory, updateCategory } = require("../../controllers/adminController/admin.category.controller");

const router = require("express").Router();

router.post("/add",addCategory);
router.delete("/delete",deleteCategory);
router.put("/update",updateCategory)

module.exports =  router;