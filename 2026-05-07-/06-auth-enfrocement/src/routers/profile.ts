import { json, Router } from "express";
import { createPost, deletePost, getPost, getProfile, updatePost } from "../controllers/profile/controller";
import { deletePostValidator, getPostValidator, newPostValidator, updatePostParamsValidator, updatePostValidator } from "../controllers/profile/validator";
import bodyValidation from "../middlewares/body-validation";
import paramsValidation from "../middlewares/params-validation";
import authEnforce from "../middlewares/auth-enforce";

const profileRouter = Router()

profileRouter.get('/', getProfile)
profileRouter.get('/:postId', paramsValidation(getPostValidator) , getPost)
profileRouter.delete('/:postId', paramsValidation(deletePostValidator), deletePost)
profileRouter.use('/', json())
profileRouter.post('/', bodyValidation(newPostValidator), createPost)
profileRouter.patch('/:postId', paramsValidation(updatePostParamsValidator), bodyValidation(updatePostValidator), updatePost)

export default profileRouter;