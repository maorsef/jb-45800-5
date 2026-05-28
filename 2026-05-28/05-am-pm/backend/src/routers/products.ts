import { Router } from "express";
import paramsValidation from "../middlewares/params-validation";
import { newProductValidator, productsPerCategoryValidator } from "../controllers/products/validator";
import { newProduct, productsPerCategory } from "../controllers/products/controller";
import bodyValidation from "../middlewares/body-validation";

const productsRouter = Router()

productsRouter.get('/category/:categoryId', paramsValidation(productsPerCategoryValidator), productsPerCategory)
productsRouter.post('/', bodyValidation(newProductValidator), newProduct)

export default productsRouter

