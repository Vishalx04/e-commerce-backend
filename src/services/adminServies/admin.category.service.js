const prisma = require("../../config/prisma");
const { AppError } = require("../../errors");

const addCategoryService = async(categoryData)=>{
    const {name} = categoryData;
    const existingCategory = await prisma.category.findUnique({
        where : {name}
    })
    if(existingCategory){
        throw new AppError("Category already exist", 409);
    }
    const category =await prisma.category.create({
        data : {name}
    })
    return category;
}

const deleteCategoryService = async(categoryId)=>{
    await prisma.category.delete({
        where:  {
            id : categoryId
        }
    })

    return {
        message : "Product deleted Successfully"
    }
}

const updateCategoryService = async(newCategory) =>{
    const category = await prisma.category.update({
        where : {
            id : newCategory.id
        },
        data: newCategory
    })

    return category;
}


module.exports = {
    addCategoryService, deleteCategoryService, updateCategoryService
}