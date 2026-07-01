const {
  getAddresses,
  getAddress,
  createAddress,
  updateAddress,
  deleteAddress,
} = require("../controllers/address.controller");

const router = require("express").Router();

router.get("/", getAddresses);
router.get("/:addressId", getAddress);
router.post("/", createAddress);
router.put("/:addressId", updateAddress);
router.delete("/:addressId", deleteAddress);

module.exports = router;
