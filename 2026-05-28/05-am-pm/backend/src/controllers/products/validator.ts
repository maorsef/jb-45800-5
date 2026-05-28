import Joi from "joi";

export const productsPerCategoryValidator = Joi.object({
    categoryId: Joi.string().uuid().required()
})

export const newProductValidator = Joi.object({
    name: Joi.string().required(),
    manufactureDate: Joi.date().required(),
    expirationDate: Joi.date().required(),
    categoryId: Joi.string().uuid().required(),
    price: Joi.number().min(0.1).required()
})

export const deleteProductValidator = Joi.object({
    productId: Joi.string().uuid().required()
})
