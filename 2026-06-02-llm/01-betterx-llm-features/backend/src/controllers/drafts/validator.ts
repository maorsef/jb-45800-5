import Joi from "joi";

export const improveDraftValidator = Joi.object({
    body: Joi.string().required()
})

export const userImproveDraftValidator = Joi.object({
    body: Joi.string().required(),
    prompt: Joi.string().required(),
    chatId: Joi.string().uuid().required()
})

export const generatePicValidator = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required()
})

