const { createProduct, deleteProduct, updateProduct } = require("../../controllers/adminController/adminProductController");

const router = require("express").Router();

router.post("/create",createProduct );
router.delete("/delete",deleteProduct);
router.put("/update",updateProduct);

module.exports = router;