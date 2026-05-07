import { json, Router } from "express";
import bodyValidation from "../middlewares/body-validation";
import { signupValidator } from "../controllers/auth/validator";
import { signup } from "../controllers/auth/controller";

const authRouter = Router()

authRouter.use('/', json())
authRouter.post('/signup', bodyValidation(signupValidator), signup)

export default authRouter