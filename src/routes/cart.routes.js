const { getCart, addToCart, deleteFromCart, updateCart } = require("../controllers/cart.controller");

const router = require("express").Router();

router.get("/",getCart);
router.post("/:productId",addToCart);
router.delete("/:productId",deleteFromCart);
router.patch("/:productId", updateCart)

module.exports = router;