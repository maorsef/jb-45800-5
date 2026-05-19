import type { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

export default function filesValidation(validator: ObjectSchema) {
    return async (request: Request, response: Response, next: NextFunction) => {
        try {
            // we push the validation result back into the request
            // because the validation may contain transformations 
            // (.e.g. uppercase)
            request.files = await validator.validateAsync(request.files)
            next()
        } catch (e) {
            next({
                status: 422,
                message: e.message || 'unprocessable entity'
            })
        }
    }    
}