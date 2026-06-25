const {
  getWishlistService,
  addWishlistItemService,
  deleteWishlistItemService,
} = require("../services/wishlist.service");

const getWishlist = async (req, res) => {
  const wishlist = await getWishlistService(req.user.id);

  return res.status(200).json({ success: true, wishlist });
};

const addWishlistItem = async (req, res) => {
  var { productId } = req.params;
  productId = Number(productId);
  const result = await addWishlistItemService(productId, req.user.id);

  return res.status(200).json(result);
};

const deleteWishlistItem = async (req, res) => {
  var { productId } = req.params;
  productId = Number(productId);
  const result = await deleteWishlistItemService(productId, req.user.id);

  return res.status(200).json(result)
};

module.exports = {
  getWishlist,
  deleteWishlistItem,
  addWishlistItem,
};
