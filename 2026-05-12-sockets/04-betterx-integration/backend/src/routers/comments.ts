import { Router } from "express";
import { newComment } from "../controllers/comments/controller";
import bodyValidation from "../middlewares/body-validation";
import { newCommentParamsValidator, newCommentValidator } from "../controllers/comments/validator";
import paramsValidation from "../middlewares/params-validation";

const commentsRouter = Router()

commentsRouter.post('/:postId', bodyValidation(newCommentValidator), paramsValidation(newCommentParamsValidator), newComment)

export default commentsRouter