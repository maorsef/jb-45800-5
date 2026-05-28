import type { NextFunction, Request, Response } from "express";
import Category from "../../models/Category";

export async function getAll(request: Request, response: Response, next: NextFunction) {
    try {
        const categories = await Category.findAll()
        response.json(categories)
    } catch (e) {
        next(e)
    }
}