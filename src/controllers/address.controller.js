const {
  getAddressesService,
  getAddressService,
  createAddressService,
} = require("../services/address.service");

const getAddresses = async (req, res) => {
  const result = await getAddressesService(req);

  return res.status(200).json({
    message: "Addresses fetched succesfully",
    addresses: result,
  });
};

const getAddress = async (req, res) => {
  const result = await getAddressService(req);

  return res.status(200).json({
    message: "Address fetched successfully",
    address: result,
  });
};

const createAddress = async (req, res) => {
    const result = await createAddressService(req);

    return res.status(201).json({
        message : "Address created successfully",
        address: result
    })
};

const deleteAddress = async (req, res) => {};

const updateAddress = async (req, res) => {};

module.exports = {
  getAddress,
  getAddresses,
  createAddress,
  deleteAddress,
  updateAddress,
};
