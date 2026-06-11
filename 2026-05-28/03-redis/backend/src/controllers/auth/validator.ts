import Joi from "joi";

export const loginValidator = Joi.object({
    username: Joi.string().min(6).alphanum().required(), // alphanum forbids %^&*$#@!~
    password: Joi.string().min(6).required(),
})

export const signupValidator = loginValidator.keys({
    // email: Joi.string().email()
    name: Joi.string()
})