const { getCart, addToCart } = require("../controllers/cart.controller");

const router = require("express").Router();

router.get("/",getCart);
router.post("/:productId",addToCart);
// router.delete("/:productId",);


module.exports = router;