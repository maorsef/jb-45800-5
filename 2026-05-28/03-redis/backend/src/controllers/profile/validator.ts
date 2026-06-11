import Joi from "joi";

export const newPostValidator = Joi.object({
    title: Joi.string().min(10).max(40).required(),
    body: Joi.string().min(20).required(),
})  

export const updatePostValidator = newPostValidator

export const deletePostValidator = Joi.object({
    postId: Joi.string().uuid()
})

export const getPostValidator = deletePostValidator
export const updatePostParamsValidator = deletePostValidator

export const newPostFilesValidator = Joi.object({
    image: Joi.object({
        mimetype: Joi.string().valid('image/jpeg', 'image/png'),
    }).unknown(true).optional()
})