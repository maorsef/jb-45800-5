import { Router } from "express";
import paramsValidation from "../middlewares/params-validation";
import { deleteProductValidator, newProductValidator, productsPerCategoryValidator } from "../controllers/products/validator";
import { deleteProduct, newProduct, productsPerCategory } from "../controllers/products/controller";
import bodyValidation from "../middlewares/body-validation";

const productsRouter = Router()

productsRouter.get('/category/:categoryId', paramsValidation(productsPerCategoryValidator), productsPerCategory)
productsRouter.post('/', bodyValidation(newProductValidator), newProduct)
productsRouter.delete('/:productId', paramsValidation(deleteProductValidator), deleteProduct)

export default productsRouter

