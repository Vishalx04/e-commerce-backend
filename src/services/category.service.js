const prisma = require("../config/prisma")

const getAllcategories = async ()=>{
    const categories =await prisma.category.findMany();

    return categories;
}

module.exports = {getAllcategories}