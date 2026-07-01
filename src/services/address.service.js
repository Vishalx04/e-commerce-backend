const prisma = require("../config/prisma");
const { NotFoundError } = require("../errors");
const { validateCity, validateState } = require("../utils/location.utils");



const getAddressesService = async (req) => {
  const addresses = await prisma.address.findMany({
    where: {
      userId: req.user.id,
    },
  });

  return addresses;
};

const getAddressService = async (req) => {
  const address = await prisma.address.findFirst({
    where: {
      id: Number(req.params.addressId),
      userId : req.user.id
    },
  });

  if (!address) {
    throw new NotFoundError("Address not found");
  }

  return address;
};

const createAddressService = async (req) => {
    const {addressLine1,addressLine2,city,state,postalCode,addressType,isDefault} = req.body;

    const stateExists = validateState(state);
    const cityExists = validateCity(city,stateExists.id);

    if(isDefault){
        await prisma.address.updateMany({
            where : {
                isDefault : true,
                userId : req.user.id
            },
            data : {
                isDefault : false
            }
        })
    };

    const address = await prisma.address.create({
        data: {
            addressLine1,addressLine2,city,state,postalCode,addressType,isDefault,userId : req.user.id
        }
    });

    return address;
};

const deleteAddressService = async () => {};

const updateAddressService = async () => {};

module.exports = {
  getAddressesService,
  getAddressService,
  createAddressService,
  deleteAddressService,
  updateAddressService,
};
