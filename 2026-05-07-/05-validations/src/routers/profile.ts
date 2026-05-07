import { json, Router } from "express";
import { createPost, deletePost, getPost, getProfile } from "../controllers/profile/controller";
import { deletePostValidator, getPostValidator, newPostValidator } from "../controllers/profile/validator";
import bodyValidation from "../middlewares/body-validation";
import paramsValidation from "../middlewares/params-validation";

const profileRouter = Router()

profileRouter.get('/', getProfile)
profileRouter.get('/:postId', paramsValidation(getPostValidator) , getPost)
profileRouter.delete('/:postId', paramsValidation(deletePostValidator), deletePost)
profileRouter.post('/', json(), bodyValidation(newPostValidator), createPost)
// profileRouter.patch('/', json(), validation(updatePostValidator), updatePost)

export default profileRouter;