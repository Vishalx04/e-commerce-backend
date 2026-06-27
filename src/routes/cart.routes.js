const { getCart } = require("../controllers/cart.controller");

const router = require("express").Router();

router.get("/",getCart);
// router.post("/:productId",);
// router.delete("/:productId",);


module.exports = router;