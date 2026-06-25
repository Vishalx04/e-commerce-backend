const prisma = require("../config/prisma");
const { NotFoundError } = require("../errors");

const getWishlistService = async (userId)=>{
    const wishlist =await prisma.wishlist.findUnique({
        where : {userId},
        include : {products : true}
    });

    if(!wishlist){
        return await prisma.wishlist.create({
            data : {
                userId,
            },
            include : {products :true}
        })
    }

    return wishlist;

}

const addWishlistItemService = async (productId, userId)=>{
    const product =await prisma.product.findUnique({
        where : {
            id : productId
        }
    });

    if(!product){
        throw new NotFoundError("Product does not exists");
    }

    const wishlist = await prisma.wishlist.update({
        where : { userId} ,
        data : {
            products : {
                connect : {id : productId}
            }
        },
        include: {products : true}
    })
    
    return {
        success :  true,
        message : "item added successfully",
        wishlist
    }
}

const deleteWishlistItemService = async (productId, userId)=>{
    const product = await prisma.product.findUnique({
        where : {
            id : productId
        }
    });

    if(!product) {
        throw new NotFoundError("Product Not found");
    }

    const wishlist =  await prisma.wishlist.update({
        where : {
            userId
        },
        data : {
            products : {
                disconnect : {
                    id : productId
                }
            }
        },
        include : {
            products : true
        }
    });

    return {
        success : true,
        message : "item deleted successfully",
        wishlist
    }
}

module.exports = {getWishlistService,addWishlistItemService,deleteWishlistItemService}