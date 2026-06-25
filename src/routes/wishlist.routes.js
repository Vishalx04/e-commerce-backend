const { getWishlist, addWishlistItem, deleteWishlistItem } = require("../controllers/wishlist.controller");

const router = require("express").Router();

router.get("/",getWishlist);
router.post("/:productId",addWishlistItem);
router.delete("/:productId",deleteWishlistItem);


module.exports = router;