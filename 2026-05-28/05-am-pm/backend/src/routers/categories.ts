import { Router } from "express";
import { getAll } from "../controllers/categories/controller";

const categoriesRouter = Router()

categoriesRouter.get('/', getAll)

export default categoriesRouter