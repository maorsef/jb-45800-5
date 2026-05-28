import type { NextFunction, Request, Response } from "express";
import Category from "../../models/Category";
import Product from "../../models/Product";

export async function productsPerCategory(request: Request<{categoryId: string}>, response: Response, next: NextFunction) {
    try {
        const { categoryId } = request.params

        const { products } = await Category.findByPk(categoryId, {
            include: Product
        })

        response.json(products)
    } catch (e) {
        next(e)
    }
}

export async function newProduct(request: Request<{}, {}, {name: string, manufactureDate: Date, expirationDate: Date, categoryID: string, price: number}>, response: Response, next: NextFunction) {
    try {

        const product = await Product.create({
            ...request.body
        })

        response.json(product)

    } catch (e) {
        next(e)
    }
}

export async function deleteProduct(request: Request<{productId: string}, {}, {}>, response: Response, next: NextFunction) {
    try {

        const { productId } = request.params

        const numberOfRowsDeleted = await Product.destroy({where: {id: productId}})

        if(numberOfRowsDeleted === 0) return next({
            status: 404,
            message: 'you tried to delete an non-existing post'
        })

        response.json({ success: true })

    } catch (e) {
        next(e)
    }
}